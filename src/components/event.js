import {createElement, castTimeFormat} from "../utils";

const getEventTemplate = (event, dayCount, date) => {
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

  const getEventTitle = () => {
    if (event.type === `Check-in` || event.type === `Sightseeing` || event.type === `Restaurant`) {
      return `${event.type} in ${event.destination}`;
    } else {
      return `${event.type} to ${event.destination}`;
    }
  };

  const day = date.getDate();
  const monthNum = castTimeFormat(date.getMonth());
  const year = date.getFullYear();

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getEventTitle()}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${year}-${monthNum}-${day + dayCount}T${event.start}">${event.start}</time>
            &mdash;
            <time class="event__end-time" datetime="${year}-${monthNum}-${day + dayCount}T${event.end}">${event.end}</time>
          </p>
          <p class="event__duration">${event.duration}</p>
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

export default class Event {
  constructor(event, dayCount, date) {
    this._event = event;
    this._dayCount = dayCount;
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return getEventTemplate(this._event, this._dayCount, this._date);
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
