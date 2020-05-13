import RouteInfo from '../components/route-info';
import TripCost from '../components/trip-cost';
import Sorting, {SortingType} from '../components/sorting';
import TripDays from '../components/trip-days';
import TripDay from '../components/trip-day';
import NoPoints from "../components/no-points";

import EventController from "./event";

import {render} from "../utils/render.js";
import moment from "moment";

const renderHeader = (container) => {
  render(container, new RouteInfo());
  render(container, new TripCost());
};

const getSortedEvents = (events, sortingType) => {
  let sortedEvents = [];
  events.forEach((eventlist) => {
    sortedEvents.push(...eventlist);
  });
  switch (sortingType) {
    case SortingType.DURATION:
      sortedEvents.sort((a, b) => {
        return moment.duration(moment(b.end).diff(moment(b.start))) - moment.duration(moment(a.end).diff(moment(a.start)));
      });
      break;
    case SortingType.PRICE:
      sortedEvents.sort((a, b) => b.price - a.price);
      break;
    case SortingType.DEFAULT:
      sortedEvents = events;
      break;
  }

  return sortedEvents;
};

export default class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeEventControllers = [];
    this._sortingComponent = new Sorting();
    this._tripDaysComponent = new TripDays();
    this._noPointsComponent = new NoPoints();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortingTypeChange = this._onSortingTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortingComponent.setSortingTypeChangeHandler(this._onSortingTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render(headerContainer) {
    const container = this._container;
    const events = this._eventsModel.getEvents();

    if (events.length === 0) {
      render(container, this._noPointsComponent);
      return;
    }

    renderHeader(headerContainer.getElement());

    render(container, this._sortingComponent);
    render(container, this._tripDaysComponent);

    const activeEventControllers = this._renderTripEvents(events);
    this._activeEventControllers = activeEventControllers;
  }

  _onSortingTypeChange(sortingType) {
    this._resetContainer();

    const sortedEvents = getSortedEvents(this._eventsModel.getEvents(), sortingType);

    if (sortingType === SortingType.DEFAULT) {
      const activeEventControllers = this._renderTripEvents(sortedEvents);
      this._activeEventControllers = activeEventControllers;
    } else {
      const isSorted = true;
      const activeEventControllers = this._renderTripEvents(sortedEvents, isSorted);
      this._activeEventControllers = activeEventControllers;
    }
  }

  _renderTripEvents(events, isSorted) {
    const container = this._tripDaysComponent.getElement();
    if (isSorted) {
      const NO_DAYS = 0;
      render(container, new TripDay(NO_DAYS));
      const activeEventControllers = this._renderEventList(events, container, NO_DAYS);
      return activeEventControllers;
    }

    const activeEventControllers = events.map((eventlist, dayCount) => {
      render(container, new TripDay(dayCount + 1));
      const eventControllerDayList = this._renderEventList(eventlist, container, dayCount);
      return eventControllerDayList;
    });
    return activeEventControllers;
  }

  _renderEventList(eventlist, parent, dayCount) {
    const container = parent.querySelectorAll(`.trip-events__list`)[dayCount];
    return eventlist.map((event) => {
      const eventController = new EventController(container, this._onDataChange, this._onViewChange);
      eventController.render(event);
      return eventController;
    });
  }

  _removeEvents() {
    this._activeEventControllers.forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach((controller) => controller.destroy());
      } else {
        item.destroy();
      }
    });
    this._activeEventControllers = [];
  }

  _resetContainer() {
    this._tripDaysComponent.getElement().innerHTML = ``;
  }

  _updateEvents() {
    this._resetContainer();
    this._removeEvents();
    this._activeEventControllers = this._renderTripEvents(this._eventsModel.getEvents());
  }

  _onDataChange(eventController, oldData, newData) {
    const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

    if (isSuccess) {
      eventController.render(newData);
    }
  }

  _onViewChange() {
    this._activeEventControllers.forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach((controller) => controller.setDefaultView());
      } else {
        item.setDefaultView();
      }
    });
  }

  _onFilterChange() {
    this._updateEvents();
    this._sortingComponent.reset();
    this._sortingComponent.setSortingTypeChangeHandler(this._onSortingTypeChange);
  }

}
