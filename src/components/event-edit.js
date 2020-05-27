import AbstractSmartComponent from './abstract-smart-component';

import {formatEditEventDateTime, getEventTitle, capitalize, getAvaliableOffers} from '../utils/common';
import {Mode, TRANSFER_TYPES, ACTIVITY_TYPES, DefaultData} from '../data/const';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";

const getEditEventTemplate = (event, mode, options = {}) => {
  const {id, type, destination, start, end, price, offers, isFavorite} = event;
  const {destinationList, offerList, externalData} = options;

  const avaliableOffers = getAvaliableOffers(offerList, type);

  const safeInputDestinationName = encode(destination.name);

  const saveBtnText = externalData.saveBtnText;
  const resetBtnText = mode === Mode.ADDING ? externalData.cancelBtnText : externalData.deleteBtnText;

  const favoritesBtn = mode === Mode.ADDING ? `` : getFavoritesBtnMarkUp();

  const getSubtypesList = (subtype) => {
    return subtype
      .map((eventType) => {
        return (
          `<div class="event__type-item">
            <input 
              id="event-type-${eventType}-${id}" 
              class="event__type-input  visually-hidden" 
              type="radio" 
              name="event-type" 
              value="${eventType}"
              ${eventType === type ? `checked` : ``}
            >
            <label 
              class="event__type-label  event__type-label--${eventType}" 
              for="event-type-${eventType}-${id}"
            >
            ${capitalize(eventType)}
            </label>
          </div>`
        );
      })
      .join(`\n`);
  };

  const getDestinationList = () => {
    return destinationList
      .map((avaliableDestination) => {
        return (
          `<option value="${avaliableDestination.name}"></option>`
        );
      })
      .join(`\n`);
  };

  const getOfferList = () => {
    return avaliableOffers
      .map((avaliableOffer, i) => {
        const checkActiveOffers = () => {
          const activeOffers = [];
          offers.forEach((offer) => {
            activeOffers.push(offer.title);
          });
          return activeOffers.indexOf(avaliableOffer.title) !== -1 ? `checked` : ``;
        };

        return (
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="event-offer" ${checkActiveOffers()}>
            <label class="event__offer-label" for="event-offer-${i}">
              <span class="event__offer-title">${avaliableOffer.title}</span>
              &plus;
              &euro; <span class="event__offer-price">${avaliableOffer.price}</span>
            </label>
          </div>`
        );
      })
      .join(`\n`);
  };

  const getPicturesList = () => {
    return destination.pictures
      .map((picture) => {
        return (
          `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
        );
      })
      .join(`\n`);

  };

  const getDateInput = (date) => {
    let dateType;
    switch (date) {
      case start:
        dateType = `start`;
        break;
      case end:
        dateType = `end`;
        break;
    }
    return (
      `<label class="visually-hidden" for="event-${dateType}-time-${id}">
      ${dateType === `start` ? `From` : `To`}
      </label>
      <input 
        class="event__input  event__input--time" 
        id="event-${dateType}-time-${id}" 
        type="text" 
        name="event-${dateType}-time" 
        value="${formatEditEventDateTime(date) || ``}"
      >`
    );
  };

  const getFavoritesBtnMarkUp = () => {
    return (
      `<input 
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
      </label>`
    );
  };

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type || `flight`}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${getSubtypesList(TRANSFER_TYPES)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${getSubtypesList(ACTIVITY_TYPES)}
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
            value="${safeInputDestinationName}" 
            list="destination-list-${id}"
          >
          <datalist id="destination-list-${id}">
            ${getDestinationList()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          ${getDateInput(start)}
          &mdash;
          ${getDateInput(end)}
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input 
            class="event__input  event__input--price" 
            id="event-price-${id}" 
            type="number" 
            name="event-price"
            style="-webkit-appearance: none; margin: 0; -moz-appearance: textfield;"
            value="${price || ``}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${saveBtnText}</button>
        <button class="event__reset-btn" type="reset">${resetBtnText}</button>

        ${favoritesBtn}
        
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${avaliableOffers.length !== 0 ? `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${getOfferList()}
            </div>
          </section>
        ` : ``}
        ${destination.name ? `
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">
              ${destination.description}
            </p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${getPicturesList()}
              </div>
            </div>
          </section>
        ` : ``}
      </section>
    </form>`
  );
};

export default class EditEvent extends AbstractSmartComponent {
  constructor(event, mode, destinationList, offerList) {
    super();

    this._event = event;
    this._mode = mode;
    this._destinationList = destinationList;
    this._offerList = offerList;
    this._externalData = DefaultData;

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
    return getEditEventTemplate(this._event, this._mode, {
      destinationList: this._destinationList,
      offerList: this._offerList,
      externalData: this._externalData
    });
  }

  recoverListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setCloseBtnClickHandler(this._closeBtnClickHandler);
    this.setDeleteBtnClickHandler(this._deleteBtnClickHandler);
    this.setFavoritesBtnClickHandler(this._favoritesBtnClickHandler);
    this._subscribeOnEvents();
  }

  removeElement() {
    this.removeFlatpickr();
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
    return new FormData(this.getElement());
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
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
    const favoritesBtn = this.getElement().querySelector(`.event__favorite-checkbox`);

    if (!favoritesBtn) {
      return;
    }

    favoritesBtn.addEventListener(`change`, handler);
    this._favoritesBtnClickHandler = handler;
  }

  _applyFlatpickr() {
    this.removeFlatpickr();

    const dateStartElement = this.getElement().querySelector(`input[name='event-start-time']`);
    this._flatpickrStart = flatpickr(dateStartElement, {
      dateFormat: `d/m/Y H:i`,
      allowInput: true,
      enableTime: true,
      minDate: formatEditEventDateTime(this._event.start),
      [`time_24hr`]: true
    });
    const dateEndElement = this.getElement().querySelector(`input[name='event-end-time']`);
    this._flatpickrEnd = flatpickr(dateEndElement, {
      dateFormat: `d/m/Y H:i`,
      allowInput: true,
      enableTime: true,
      minDate: formatEditEventDateTime(this._event.start),
      [`time_24hr`]: true
    });
  }

  removeFlatpickr() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeBtns = element.querySelectorAll(`.event__type-input`);
    eventTypeBtns.forEach((btn) => {
      btn.addEventListener(`click`, (evt) => {
        this._event.type = evt.target.value;

        this.rerender();
      });
    });
    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._event.destination.name = evt.target.value;
        this._event.destination.description = `Choose destination from the suggested list`;
        this._event.destination.pictures = [];

        this._destinationList.map((destination) => {
          if (destination.name === evt.target.value) {
            this._event.destination = destination;
          }
        });

        this.rerender();
      });

    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, (evt) => {
        this._event.price = evt.target.value;

        this.rerender();
      });
  }
}
