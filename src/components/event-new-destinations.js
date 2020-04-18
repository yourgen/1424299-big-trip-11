import {createElement} from "../utils";

export const getDestinationListMarkup = (destination) => {
  return (
    `<option value="${destination}"></option>`
  );
};

export default class NewEventDestinationList {
  constructor(destination) {
    this._destination = destination;
    this._element = null;
  }

  getTemplate() {
    return getDestinationListMarkup(this._destination);
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
