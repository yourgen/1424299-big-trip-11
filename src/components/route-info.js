import {tripPoints, tripDestinations} from "../data/event-data";
import {months} from '../data/common-data';
import {createElement} from "../utils";

const getRouteInfoTemplate = (date) => {

  const normalizeArrMiddle = (arr) => {
    return arr.length % 2 === 0 ? arr[arr.length / 2] : arr[(arr.length - 1) / 2];
  };

  const day = date.getDate();
  const month = months[date.getMonth()];
  const middleDay = normalizeArrMiddle(tripPoints);
  const lastDay = tripPoints[tripPoints.length - 1];
  const middleDestination = tripDestinations.size > 3 ? `...` : normalizeArrMiddle(middleDay).destination;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">
        ${tripPoints[0][0].destination} &mdash; ${middleDestination} &mdash; ${lastDay[lastDay.length - 1].destination}
      </h1>

      <p class="trip-info__dates">${month} ${day}&nbsp;&mdash;&nbsp;${day + tripPoints.length - 1}</p>
    </div>`
  );
};

export default class RouteInfo {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return getRouteInfoTemplate(this._date);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
