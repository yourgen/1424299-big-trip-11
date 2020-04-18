import {createElement, getRandomNumber} from "../utils.js";

export const getNewEventOffersMarkUp = (avaliableOffer, offerNumber) => {
  const checkRandomizer = () => {
    return Math.random() > 0.5 ? `checked` : ``;
  };

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerNumber}" type="checkbox" name="event-offer" ${checkRandomizer()}>
      <label class="event__offer-label" for="event-offer-${offerNumber}">
        <span class="event__offer-title">${avaliableOffer}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${getRandomNumber(0, 100)}</span>
      </label>
    </div>`
  );
};

export default class NewEventOffer {
  constructor(avaliableOffer, offerNumber) {
    this._avaliableOffer = avaliableOffer;
    this._offerNumber = offerNumber;
    this._element = null;
  }

  getTemplate() {
    return getNewEventOffersMarkUp(this.__avaliableOffer, this._offerNumber);
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
