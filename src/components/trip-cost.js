import {tripPoints} from "../data/event-data";
import {createElement} from "../utils";

const getTripCostTemplate = () => {
  const eventPrices = [];
  tripPoints.forEach((eventlist) => {
    eventlist.forEach((event) => {
      eventPrices.push(event.price);
    });
  });
  const tripCost = eventPrices.reduce((acc, value) => acc + value);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
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
