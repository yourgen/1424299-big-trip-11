import {tripEvents, tripDestinations} from "../data/event-data";
import {formatRouteInfoDate} from "../utils/common";
import AbstractComponent from "./abstract-component";
import moment from "moment";

const getRouteInfoTemplate = () => {
  const firstTripDay = new Date(); // TODO  дата начала
  const lastTripDay = moment().add(tripEvents.length - 1, `d`);

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
        ${tripDestinations[0]} ${getMiddleDestination()} ${tripDestinations[tripDestinations.length - 1]}
      </h1>
      <p class="trip-info__dates">
        ${formatRouteInfoDate(firstTripDay)} &mdash; ${formatRouteInfoDate(lastTripDay) || ``}
      </p>
    </div>`
  );
};

export default class RouteInfo extends AbstractComponent {
  getTemplate() {
    return getRouteInfoTemplate();
  }
}
