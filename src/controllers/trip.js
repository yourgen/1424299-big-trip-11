import RouteInfo from '../components/route-info';
import TripCost from '../components/trip-cost';
import Sorting, {SortingType} from '../components/sorting';
import TripDays from '../components/trip-days';
import TripPoint from '../components/trip-point';
import NoPoints from "../components/no-points";

import {render} from "../utils/render.js";

const renderHeader = (container, tripStart) => {
  render(container, new RouteInfo(tripStart));
  render(container, new TripCost(tripStart));
};

const renderEventList = (eventlist, parent, dayCount = 0, date) => {
  const container = parent.querySelectorAll(`.trip-events__list`);
  eventlist.map((event) => {
    renderEvent(container[dayCount], event, dayCount, date);
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
    this._sortingComponent = new Sorting();
    this._tripDaysComponent = new TripDays();
    this._noPointsComponent = new NoPoints();
  }

  render(headerContainer, tripPoints, tripStart) {
    const container = this._container;
    if (tripPoints.length === 0) {
      render(container, this._noPointsComponent);
      return;
    }
    renderHeader(headerContainer.getElement(), tripStart);

    render(container, this._sortingComponent);
    render(container, this._tripDaysComponent);

    const tripDaysElement = this._tripDaysComponent.getElement();

    tripPoints.map((eventlist, dayCount) => {
      render(tripDaysElement, new TripPoint(dayCount + 1, tripStart));

      renderEventList(eventlist, tripDaysElement, dayCount, tripStart);
    });

    this._sortingComponent.setSortingTypeChangeHandler((sortingType) => {
      const sortedEvents = getSortedEvents(tripPoints, sortingType);
      tripDaysElement.innerHTML = ``;

      if (sortingType === SortingType.DEFAULT) {
        sortedEvents.map((eventlist, dayCount) => {
          render(tripDaysElement, new TripPoint(dayCount + 1, tripStart));
          renderEventList(eventlist, tripDaysElement, dayCount, tripStart);
        });
      } else {
        const NO_DAYS = 0;
        render(tripDaysElement, new TripPoint(NO_DAYS, tripStart));
        renderEventList(sortedEvents, tripDaysElement, NO_DAYS, tripStart);
      }
    });
  }
}
