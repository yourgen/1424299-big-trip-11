import {createElement} from "../utils";

const getOfferMarkup = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

export default class Offer {
  constructor(offer) {
    this._offer = offer;
    this._element = null;
  }

  getTemplate() {
    return getOfferMarkup(this._offer);
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
