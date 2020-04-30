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

const renderEventList = (eventlist, parent, dayCount = 0, date) => {
  const container = parent.querySelectorAll(`.trip-events__list`)[dayCount];
  eventlist.map((event, eventIndex) => {
    const eventController = new EventController(container);
    eventController.render(event, dayCount, date, eventIndex + 1);
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
    this._tripStart = null;
    this._sortingComponent = new Sorting();
    this._tripDaysComponent = new TripDays();
    this._noPointsComponent = new NoPoints();
    this._onSortingTypeChange = this._onSortingTypeChange.bind(this);
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

    this._events.map((eventlist, dayCount) => {
      render(tripDaysElement, new TripPoint(dayCount + 1, this._tripStart));
      renderEventList(eventlist, tripDaysElement, dayCount, this._tripStart);
    });
  }

  _onSortingTypeChange(sortingType) {
    const sortedEvents = getSortedEvents(this._events, sortingType);
    const tripDaysElement = this._tripDaysComponent.getElement();
    tripDaysElement.innerHTML = ``;

    if (sortingType === SortingType.DEFAULT) {
      sortedEvents.map((eventlist, dayCount) => {
        render(tripDaysElement, new TripPoint(dayCount + 1, this._tripStart));
        renderEventList(eventlist, tripDaysElement, dayCount, this._tripStart);
      });
    } else {
      const NO_DAYS = 0;
      render(tripDaysElement, new TripPoint(NO_DAYS, this._tripStart));
      renderEventList(sortedEvents, tripDaysElement, NO_DAYS, this._tripStart);
    }
  }
}
