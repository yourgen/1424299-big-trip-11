import {tripPoints, tripDestinations} from "../data/event-data";
import {months} from '../data/common-data';
import AbstractComponent from "./abstract-component.js";

const getRouteInfoTemplate = (date) => {
  const day = date.getDate();
  const month = months[date.getMonth()];

  const getMiddleDestination = () => {
    switch (tripDestinations.length) {
      case 3:
        return `&mdash; ${tripDestinations[1]} &mdash;`;
      case 2:
      case 1:
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
