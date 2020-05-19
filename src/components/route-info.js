import {formatRouteInfoDate} from '../utils/common';
import AbstractComponent from './abstract-component';

const getRouteInfoTemplate = (events) => {
  const firstTripDay = events[0][0].start;
  const lastTripDay = events[events.length - 1].slice(-1)[0].end;

  const visitedCities = new Set();
  events.forEach((eventlist) => {
    eventlist.forEach((event) => {
      visitedCities.add(event.destination.name);
    });
  });
  const tripDestinations = Array.from(visitedCities);

  const MAX_VISIBLE_DESTINATION_COUNT = 3;
  const MIN_VISIBLE_DESTINATION_COUNT = 1;

  const getMiddleDestination = () => {
    switch (tripDestinations.length) {
      case MAX_VISIBLE_DESTINATION_COUNT:
        return `&mdash; ${tripDestinations[1]} &mdash;`;
      case MAX_VISIBLE_DESTINATION_COUNT - MIN_VISIBLE_DESTINATION_COUNT:
      case MIN_VISIBLE_DESTINATION_COUNT:
        return `&mdash;`;
      default:
        return `&mdash; ... &mdash;`;
    }
  };

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">
        ${events[0][0].destination.name} ${getMiddleDestination()} ${events[events.length - 1].slice(-1)[0].destination.name}
      </h1>
      <p class="trip-info__dates">
        ${formatRouteInfoDate(firstTripDay)} &mdash; ${formatRouteInfoDate(lastTripDay) || ``}
      </p>
    </div>`
  );
};

export default class RouteInfo extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return getRouteInfoTemplate(this._events);
  }
}
