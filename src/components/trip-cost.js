import {tripPoints} from "../data/event-data";
import {createElement} from "../utils/common";

const getTripCostTemplate = () => {
  const countTripCost = () => {
    const tripCost = [];
    tripPoints.forEach((eventlist) => {
      eventlist.forEach((event) => {
        tripCost.push(event.price);
      });
    });
    return tripCost.reduce((acc, value) => acc + value);
  };

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${countTripCost()}</span>
    </p>`
  );
};

export default class TripCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTripCostTemplate();
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
