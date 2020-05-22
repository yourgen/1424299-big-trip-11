import {formatRouteInfoDate, sortEventsByDate} from '../utils/common';
import AbstractComponent from './abstract-component';

const getRouteInfoTemplate = (events) => {
  const sortedEvents = sortEventsByDate(events);

  const firstTripEvent = sortedEvents[0];
  const lastTripEvent = sortedEvents[sortedEvents.length - 1];

  const uniqueDestinations = new Set();
  sortedEvents.forEach((event) => {
    uniqueDestinations.add(event.destination.name);
  });
  const tripDestinations = Array.from(uniqueDestinations);

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
        ${firstTripEvent.destination.name} ${getMiddleDestination()} ${lastTripEvent.destination.name}
      </h1>
      <p class="trip-info__dates">
        ${formatRouteInfoDate(firstTripEvent.start)} &mdash; ${formatRouteInfoDate(lastTripEvent.end) || ``}
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
