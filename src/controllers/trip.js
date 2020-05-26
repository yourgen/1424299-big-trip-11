import RouteInfo from '../components/route-info';
import TripCost from '../components/trip-cost';
import Sorting from '../components/sorting';
import TripDays from '../components/trip-days';
import TripDay from '../components/trip-day';
import NoEvents from '../components/no-events';

import EventController from './event';

import {Mode as EventControllerMode, EmptyEvent, SortingType, HIDDEN_CLASS} from '../data/const';

import {render, remove, ElementPosition} from '../utils/render';
import {sortEventsByDuration} from '../utils/common';

const getSortedEvents = (events, sortingType = SortingType.DEFAULT) => {
  let sortedEvents = events.slice();
  switch (sortingType) {
    case SortingType.DURATION:
      sortEventsByDuration(sortedEvents);
      break;
    case SortingType.PRICE:
      sortedEvents.sort((a, b) => b.price - a.price);
      break;
    case SortingType.DEFAULT:
      sortedEvents.sort((a, b) => a.start - b.start);

      const tripDays = new Set();
      sortedEvents.map((event) => {
        tripDays.add(event.start.getDate());
      });

      const eventsByDay = Array.from(tripDays);
      eventsByDay.map((day, i) => {
        const firstIndex = sortedEvents.map((event) => event.start.getDate()).indexOf(day);
        const lastIndex = sortedEvents.map((event) => event.start.getDate()).lastIndexOf(day);
        eventsByDay[i] = sortedEvents.slice(firstIndex, lastIndex + 1);
      });

      sortedEvents = eventsByDay;
      break;
  }
  return sortedEvents;
};

export default class TripController {
  constructor(container, headerContainer, addNewEventBtn, eventsModel, api) {
    this._container = container;
    this._headerContainer = headerContainer.getElement();
    this._addNewEventBtn = addNewEventBtn;
    this._eventsModel = eventsModel;
    this._api = api;

    this._activeEventControllers = [];

    this._sortingComponent = new Sorting();
    this._tripDaysComponent = new TripDays();
    this._noEventsComponent = new NoEvents();
    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortingTypeChange = this._onSortingTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortingComponent.setSortingTypeChangeHandler(this._onSortingTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  render() {
    const container = this._container;
    const events = this._eventsModel.getEvents();

    if (events.length === 0) {
      render(container, this._noEventsComponent);
      return;
    }


    render(container, this._sortingComponent);
    render(container, this._tripDaysComponent);

    this._renderTripEvents(getSortedEvents(events));
    render(this._headerContainer, new RouteInfo(events));
    render(this._headerContainer, new TripCost(events));
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    const events = this._eventsModel.getEvents();
    const destinationList = this._eventsModel.getDestinations();
    const offerList = this._eventsModel.getOffers();

    const tripDaysElement = this._tripDaysComponent.getElement();
    const emptyDayContainer = new TripDay(0);

    if (events.length === 0) {
      remove(this._noEventsComponent);
      render(this._container, this._tripDaysComponent);
    }

    render(tripDaysElement, emptyDayContainer, ElementPosition.AFTERBEGIN);
    const container = emptyDayContainer.getElement().querySelector(`.trip-events__list`);

    this._creatingEvent = new EventController(container, this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyEvent, destinationList, offerList, EventControllerMode.ADDING);
    this._activeEventControllers = this._activeEventControllers.concat(this._creatingEvent);
  }

  _onSortingTypeChange(sortingType) {
    this._resetContainer();
    this._removeEvents();

    const sortedEvents = getSortedEvents(this._eventsModel.getEvents(), sortingType);
    if (sortingType === SortingType.DEFAULT) {
      this._renderTripEvents(sortedEvents);
    } else {
      const isSorted = true;
      this._renderTripEvents(sortedEvents, isSorted);
    }
  }

  _renderTripEvents(events, isSorted) {
    const container = this._tripDaysComponent.getElement();
    if (isSorted) {
      const NO_DAYS = 0;
      render(container, new TripDay(NO_DAYS));
      const activeEventControllers = this._renderEventList(events, container, NO_DAYS);
      this._activeEventControllers = this._activeEventControllers.concat(activeEventControllers);
    } else {
      const activeEventControllers = events.map((eventlist, dayCount) => {
        const eventListDate = eventlist[0].start;
        render(container, new TripDay(dayCount + 1, eventListDate));
        const eventControllerDayList = this._renderEventList(eventlist, container, dayCount);
        return eventControllerDayList;
      });
      activeEventControllers.map((eventControllerDayList) => {
        eventControllerDayList.map((eventController) => {
          this._activeEventControllers = this._activeEventControllers.concat(eventController);
        });
      });
    }
  }

  _renderEventList(eventlist, parent, dayCount) {
    const destinationList = this._eventsModel.getDestinations();
    const offerList = this._eventsModel.getOffers();

    const container = parent.querySelectorAll(`.trip-events__list`)[dayCount];
    return eventlist.map((event) => {
      const eventController = new EventController(container, this._onDataChange, this._onViewChange);
      eventController.render(event, destinationList, offerList, EventControllerMode.DEFAULT);
      return eventController;
    });
  }

  _removeEvents() {
    this._activeEventControllers.forEach((controller) => controller.destroy());
    this._activeEventControllers = [];
  }

  _resetContainer() {
    this._tripDaysComponent.getElement().innerHTML = ``;
  }

  _updateEvents() {
    this._resetContainer();
    this._removeEvents();
    this._renderTripEvents(getSortedEvents(this._eventsModel.getEvents()));
  }

  _onDataChange(eventController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;

      if (newData === null) {
        eventController.destroy();
        this._updateEvents();
      } else {
        this._api.createEvent(newData)
          .then((eventModel) => {
            this._eventsModel.addEvent(eventModel);
            eventController.render(eventModel, EventControllerMode.DEFAULT);

            this._activeEventControllers = [].concat(eventController, this._activeEventControllers);
          });
      }
    } else if (newData === null) {
      this._api.deleteEvent(oldData.id)
        .then(() => {
          this._eventsModel.removeEvent(oldData.id);
          this._updateEvents();
        });
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((eventModel) => {
          const isSuccess = this._eventsModel.updateEvent(oldData.id, eventModel);

          if (isSuccess) {
            eventController.render(eventModel, EventControllerMode.DEFAULT);
            this._updateEvents();
          }
        });
    }
  }

  _onViewChange() {
    this._activeEventControllers.forEach((controller) => controller.setDefaultView());
  }

  _onFilterChange() {
    this._updateEvents();
    this._sortingComponent.reset();
    this._sortingComponent.setSortingTypeChangeHandler(this._onSortingTypeChange);
  }
}
