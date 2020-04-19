import {createElement} from "../utils.js";

const getTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTripInfoTemplate();
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
