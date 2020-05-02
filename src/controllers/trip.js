import RouteInfo from '../components/route-info';
import TripCost from '../components/trip-cost';
import Sorting, {SortingType} from '../components/sorting';
import TripDays from '../components/trip-days';
import TripPoint from '../components/trip-point';
import NoPoints from "../components/no-points";

import EventController from "./event";

import {render} from "../utils/render.js";

const renderHeader = (container, tripStart) => {
  render(container, new RouteInfo(tripStart));
  render(container, new TripCost(tripStart));
};

const renderEventList = (eventlist, parent, dayCount = 0, date, onDataChange, onViewChange) => {
  const container = parent.querySelectorAll(`.trip-events__list`)[dayCount];
  return eventlist.map((event, eventIndex) => {
    const eventController = new EventController(container, onDataChange, onViewChange);
    eventController.render(event, dayCount, date, eventIndex + 1);

    return eventController;
  });
};


const getSortedEvents = (events, sortingType) => {
  let sortedEvents = [];
  events.forEach((eventlist) => {
    sortedEvents.push(...eventlist);
  });
  switch (sortingType) {
    case SortingType.DURATION:
      sortedEvents.sort((a, b) => b.duration - a.duration);
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
  constructor(container) {
    this._container = container;

    this._events = [];
    this._activeEventControllers = [];
    this._tripStart = null;
    this._sortingComponent = new Sorting();
    this._tripDaysComponent = new TripDays();
    this._noPointsComponent = new NoPoints();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortingTypeChange = this._onSortingTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortingComponent.setSortingTypeChangeHandler(this._onSortingTypeChange);
  }

  render(headerContainer, events, tripStart) {
    this._events = events;
    this._tripStart = tripStart;

    const container = this._container;

    if (this._events.length === 0) {
      render(container, this._noPointsComponent);
      return;
    }
    renderHeader(headerContainer.getElement(), this._tripStart);

    render(container, this._sortingComponent);
    render(container, this._tripDaysComponent);
    const tripDaysElement = this._tripDaysComponent.getElement();

    const activeEventControllers = this._events.map((eventlist, dayCount) => {
      render(tripDaysElement, new TripPoint(dayCount + 1, this._tripStart));

      const eventControllerDayList = renderEventList(eventlist, tripDaysElement, dayCount, this._tripStart, this._onDataChange, this._onViewChange);
      return eventControllerDayList;
    });
    this._activeEventControllers = activeEventControllers;
  }

  _onSortingTypeChange(sortingType) {
    const sortedEvents = getSortedEvents(this._events, sortingType);
    const tripDaysElement = this._tripDaysComponent.getElement();
    tripDaysElement.innerHTML = ``;

    if (sortingType === SortingType.DEFAULT) {
      const activeEventControllers = sortedEvents.map((eventlist, dayCount) => {
        render(tripDaysElement, new TripPoint(dayCount + 1, this._tripStart));

        const eventControllerDayList = renderEventList(eventlist, tripDaysElement, dayCount, this._tripStart, this._onDataChange, this._onViewChange);
        return eventControllerDayList;
      });

      this._activeEventControllers = activeEventControllers;
    } else {
      const NO_DAYS = 0;
      render(tripDaysElement, new TripPoint(NO_DAYS, this._tripStart));
      const activeEventControllers = renderEventList(sortedEvents, tripDaysElement, NO_DAYS, this._tripStart, this._onDataChange, this._onViewChange);
      this._activeEventControllers = activeEventControllers;
    }
  }

  _onDataChange(eventController, oldData, newData) {
    this._events.forEach((eventlist, dayCount) => {
      const index = eventlist.findIndex((it) => it === oldData);
      if (index === -1) {
        return;
      }
      eventlist = [].concat(this._events[dayCount].slice(0, index), newData, this._events[dayCount].slice(index + 1));
      eventController.render(this._events[dayCount][index], dayCount, this._tripStart, index + 1);
    });
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
}
