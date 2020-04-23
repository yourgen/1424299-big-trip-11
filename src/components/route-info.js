import {tripPoints, tripDestinations} from "../data/event-data";
import {months} from '../data/common-data';
import AbstractComponent from "./abstract-component.js";

const getRouteInfoTemplate = (date) => {
  const day = date.getDate();
  const month = months[date.getMonth()];

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

      <p class="trip-info__dates">${month} ${day}&nbsp;&mdash;&nbsp;${day + (tripPoints.length - 1) || ``}</p>
    </div>`
  );
};

export default class RouteInfo extends AbstractComponent {
  constructor(date) {
    super();
    this._date = date;
  }

  getTemplate() {
    return getRouteInfoTemplate(this._date);
  }
}
