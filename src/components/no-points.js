import {createElement} from "../utils/common.js";

const getNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};


export default class NoPoints {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getNoPointsTemplate();
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
