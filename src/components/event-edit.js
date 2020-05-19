import {eventTypes, tripDestinations} from '../data/event-data';
import {formatEditEventDateTime, getEventTitle} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const getEditEventTemplate = (event, destinationList, offerList) => {
  const {id, type, destination, start, end, price, offers, isFavorite} = event;

  console.log(destinationList);
  console.log(offerList);

  const transferTypes = [];
  const activityTypes = [];

  const getEventTypeMarkup = (eventType, i) => {
    const lowerCaseEventType = eventType.toLowerCase();
    return (
      `<div class="event__type-item">
        <input 
          id="event-type-${lowerCaseEventType}-${i}" 
          class="event__type-input  visually-hidden" 
          type="radio" 
          name="event-type" 
          value="${lowerCaseEventType}"
          ${lowerCaseEventType === type.toLowerCase() ? `checked` : ``}
        >
        <label 
          class="event__type-label  event__type-label--${lowerCaseEventType}" 
          for="event-type-${lowerCaseEventType}-${i}"
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

  const getDestinationListMarkup = (destinationListItem) => {
    return (
      `<option value="${destinationListItem}"></option>`
    );
  };

  const formDestinationList = () => {
    const destinationList = [];
    for (let destinationListItem of tripDestinations) {
      destinationList
        .push(getDestinationListMarkup(destinationListItem))
      ;
    }
    return destinationList.join(`\n`);
  };

  const getEditEventOffersMarkUp = (avaliableOfferName, avaliableOfferIndex) => {
    const checkActiveOffers = () => {
      const activeOffers = [];
      offers.forEach((offer) => {
        activeOffers.push(offer.name);
      });
      return activeOffers.indexOf(avaliableOfferName) !== -1 ? `checked` : ``;
    };

    const getOfferPrice = () => {
      const DEFAULT_OFFER_PRICE = 10;

      return DEFAULT_OFFER_PRICE;
    };

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${avaliableOfferIndex}" type="checkbox" name="event-offer" ${checkActiveOffers()}>
        <label class="event__offer-label" for="event-offer-${avaliableOfferIndex}">
          <span class="event__offer-title">${avaliableOfferName}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${getOfferPrice()}</span>
        </label>
      </div>`
    );
  };

  const avaliableOffers = [];
  eventTypes.forEach((item) => {
    item.forEach((eventType) => {
      if (eventType.name === type) {
        avaliableOffers.push(...eventType.offers);
      }
    });
  });

  const formOfferList = () => {
    const offerList = avaliableOffers
      .map((avaliableOfferName, avaliableOfferNumber) => getEditEventOffersMarkUp(avaliableOfferName, avaliableOfferNumber))
      .join(`\n`);

    return offerList;
  };

  const getEditEventPhotoMarkUp = (photoLink) => {
    return (
      `<img class="event__photo" src="${photoLink}" alt="Event photo">`
    );
  };

  const formPhotosList = () => {
    const photoList = destination.pictures
      .map((photoLink) => getEditEventPhotoMarkUp(photoLink))
      .join(`\n`);

    return photoList;
  };

  const isNewEvent = false;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase() || `flight`}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

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
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${getEventTitle(event)}
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-${id}" 
            type="text" 
            name="event-destination" 
            value="${destination || ``}" 
            list="destination-list-${id}"
          >
          <datalist id="destination-list-${id}">
            ${formDestinationList()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">
            From
          </label>
          <input 
            class="event__input  event__input--time" 
            id="event-start-time-${id}" 
            type="text" 
            name="event-start-time" 
            value="${formatEditEventDateTime(start) || ``}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">
            To
          </label>
          <input 
            class="event__input  event__input--time" 
            id="event-end-time-${id}" 
            type="text" 
            name="event-end-time" 
            value="${formatEditEventDateTime(end) || ``}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price || ``}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${isNewEvent ? `
          <button class="event__reset-btn" type="reset">Cancel</button>
        ` : `
          <button class="event__reset-btn" type="reset">Delete</button>
          <input 
            id="event-favorite-${id}"
            class="event__favorite-checkbox
            visually-hidden"
            type="checkbox"
            name="event-favorite"
            ${isFavorite ? `checked` : ``}
          >
          <label class="event__favorite-btn" for="event-favorite-${id}">
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
            ${destination.description || ``}
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

const parseFormData = (formData) => {
  // TODO настроить получение всех ключей события
  return {
    destination: formData.get(`event-destination`), // !!
    start: formData.get(`event-start-time`),
    end: formData.get(`event-end-time`),
    price: formData.get(`event-price`),
    // type: null,
    // offers: formData.getAll(`repeat`).reduce((acc, it) => {
    //   acc[it] = true;
    //   return acc;
    // }, repeatingDays),
  };
};

export default class EditEvent extends AbstractSmartComponent {
  constructor(event, destinationList, offerList) {
    super();
    this._event = event;
    this._destinationList = destinationList;
    this._offerList = offerList;

    this._submitHandler = null;
    this._closeBtnClickHandler = null;
    this._deleteBtnClickHandler = null;
    this._favoritesBtnClickHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;

    this._subscribeOnEvents();
    this._applyFlatpickr();
  }

  getTemplate() {
    return getEditEventTemplate(this._event, this._destinationList, this._offerList);
  }

  recoverListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setCloseBtnClickHandler(this._closeBtnClickHandler);
    this.setDeleteBtnClickHandler(this._deleteBtnClickHandler);
    this.setFavoritesBtnClickHandler(this._favoritesBtnClickHandler);
    this._subscribeOnEvents();
  }

  removeElement() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    super.removeElement();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this.rerender();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }
  setCloseBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._closeBtnClickHandler = handler;
  }
  setDeleteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteBtnClickHandler = handler;
  }
  setFavoritesBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, handler);
    this._favoritesBtnClickHandler = handler;
  }
  _applyFlatpickr() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }
    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    const dateStartElement = this.getElement().querySelector(`input[name='event-start-time']`);
    this._flatpickrStart = flatpickr(dateStartElement, {
      dateFormat: `d/m/Y H:i`,
      allowInput: true,
      enableTime: true,
      minDate: formatEditEventDateTime(this._event.start),
      // eslint-disable-next-line camelcase
      time_24hr: true
    });
    const dateEndElement = this.getElement().querySelector(`input[name='event-end-time']`);
    this._flatpickrEnd = flatpickr(dateEndElement, {
      dateFormat: `d/m/Y H:i`,
      allowInput: true,
      enableTime: true,
      minDate: formatEditEventDateTime(this._event.start),
      // eslint-disable-next-line camelcase
      time_24hr: true
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeBtns = element.querySelectorAll(`.event__type-input`);
    eventTypeBtns.forEach((btn) => {
      btn.addEventListener(`click`, (evt) => {
        this._event.type = evt.target.value.charAt(0).toUpperCase() + evt.target.value.slice(1);

        this.rerender();
      });
    });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._event.destination = evt.target.value;
        this._event.description = `Description changed to ${this._event.destination}`;

        this.rerender();
      });

    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, (evt) => {
        this._event.price = evt.target.value;

        this.rerender();
      });
  }
}
