import {eventTypes, tripDestinations} from '../data/event-data';
import {castTimeFormat, getRandomNumber, getEventTitle} from "../utils/common";
import AbstractComponent from "./abstract-component.js";


const getEditEventTemplate = (event, dayCount, date, eventIndex) => {
  const transferTypes = [];
  const activityTypes = [];

  const getEventTypeMarkup = (eventType, i) => {
    return (
      `<div class="event__type-item">
        <input 
          id="event-type-${eventType.toLowerCase()}-${i}" 
          class="event__type-input  visually-hidden" 
          type="radio" 
          name="event-type" 
          value="${eventType.toLowerCase()}"
          ${eventType.toLowerCase() === event.type.toLowerCase() ? `checked` : ``}
        >
        <label 
          class="event__type-label  event__type-label--${eventType.toLowerCase()}" 
          for="event-type-${eventType.toLowerCase()}-${i}"
        >
        ${eventType}
        </label>
      </div>`
    );
  };

  const formSubtypesList = (subtype, index) => {
    eventTypes[index].forEach((item) => {
      subtype.push(item.name);
    });
    const subtypesList = subtype
      .map((eventType, i) => getEventTypeMarkup(eventType, i + 1))
      .join(`\n`);

    return subtypesList;
  };

  const getDestinationListMarkup = (destination) => {
    return (
      `<option value="${destination}"></option>`
    );
  };

  const formDestinationList = () => {
    const destinationList = [];
    for (let destination of tripDestinations) {
      destinationList
        .push(getDestinationListMarkup(destination))
      ;
    }
    return destinationList.join(`\n`);
  };

  const getEditEventOffersMarkUp = (avaliableOffer, offerNumber) => {
    const activeOffersCheck = () => {
      return Math.random() > 0.5 ? `checked` : ``;
    };

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerNumber}" type="checkbox" name="event-offer" ${activeOffersCheck()}>
        <label class="event__offer-label" for="event-offer-${offerNumber}">
          <span class="event__offer-title">${avaliableOffer}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${getRandomNumber(0, 100)}</span>
        </label>
      </div>`
    );
  };

  const avaliableOffers = [];
  eventTypes.forEach((item) => {
    item.forEach((eventType) => {
      if (eventType.name === event.type) {
        avaliableOffers.push(...eventType.offers);
      }
    });
  });

  const formOfferList = () => {
    const offerList = avaliableOffers
      .map((avaliableOffer, offerNumber) => getEditEventOffersMarkUp(avaliableOffer, offerNumber))
      .join(`\n`);

    return offerList;
  };

  const getEditEventPhotoMarkUp = (photoLink) => {
    return (
      `<img class="event__photo" src="${photoLink}" alt="Event photo">`
    );
  };

  const formPhotosList = () => {
    const photoList = event.photos
      .map((photoLink) => getEditEventPhotoMarkUp(photoLink))
      .join(`\n`);

    return photoList;
  };

  const day = date.getDate() || ``;
  const monthNum = castTimeFormat(date.getMonth()) || ``;
  const year = date.getFullYear() % 100 || ``;

  const isNewEvent = false;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${eventIndex}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.toLowerCase() || `flight`}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventIndex}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${formSubtypesList(transferTypes, 0)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${formSubtypesList(activityTypes, 1)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${eventIndex}">
            ${getEventTitle(event)}
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-${eventIndex}" 
            type="text" 
            name="event-destination" 
            value="${event.destination || ``}" 
            list="destination-list-1"
          >
          <datalist id="destination-list-${eventIndex}">
            ${formDestinationList()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${eventIndex}">
            From
          </label>
          <input 
            class="event__input  event__input--time" 
            id="event-start-time-${eventIndex}" 
            type="text" 
            name="event-start-time" 
            value="${day + dayCount}/${monthNum}/${year} ${event.start || ``}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-${eventIndex}">
            To
          </label>
          <input 
            class="event__input  event__input--time" 
            id="event-end-time-${eventIndex}" 
            type="text" 
            name="event-end-time" 
            value="${day + dayCount}/${monthNum}/${year} ${event.end || ``}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${eventIndex}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${eventIndex}" type="text" name="event-price" value="${event.price || ``}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${isNewEvent ? `
          <button class="event__reset-btn" type="reset">Cancel</button>
        ` : `
          <button class="event__reset-btn" type="reset">Delete</button>
          <input id="event-favorite-${eventIndex}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
          <label class="event__favorite-btn" for="event-favorite-${eventIndex}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path
               d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"
              ></path>
            </svg>
          </label>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        `}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${formOfferList()}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${event.description || ``}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${formPhotosList()}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class EditEvent extends AbstractComponent {
  constructor(event, dayCount, date, eventIndex) {
    super();
    this._event = event;
    this._dayCount = dayCount;
    this._date = date;
    this._eventIndex = eventIndex;
  }

  getTemplate() {
    return getEditEventTemplate(this._event, this._dayCount, this._date, this._eventIndex);
  }
  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }
}
