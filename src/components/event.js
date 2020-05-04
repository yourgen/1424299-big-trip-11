import {getEventTitle, castDurationFormat, formatTime, formatDateTime} from "../utils/common";
import AbstractComponent from "./abstract-component.js";


const getEventTemplate = (event) => {
  const getOfferMarkup = (offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  };
  const formOfferList = () => {
    const offerList = event.offers
      .map((offer) => getOfferMarkup(offer))
      .join(`\n`);

    return offerList;
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getEventTitle(event)} ${event.destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDateTime(event.start)}">
              ${formatTime(event.start)}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${formatDateTime(event.end)}">
              ${formatTime(event.end)}
            </time>
          </p>
          <p class="event__duration">${castDurationFormat(event.duration)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${formOfferList()}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return getEventTemplate(this._event);
  }
  setEditBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
