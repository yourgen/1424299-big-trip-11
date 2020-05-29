import Event from '../components/event';
import EditEvent from '../components/event-edit';

import EventModel from '../models/event';

import {render, replace, remove, ElementPosition} from '../utils/render';

import {Mode, EmptyEvent, SHAKE_ANIMATION_TIMEOUT} from '../data/const';
import {getAvaliableOffers} from '../utils/common';

const parseFormData = (formData, event, destinationList, offerList) => {
  const start = formData.get(`event-start-time`);
  const end = formData.get(`event-end-time`);
  const destination = destinationList.find((item) => {
    return formData.get(`event-destination`) === item.name;
  });
  const isFavorite = formData.get(`event-favorite`);
  const avaliableOffers = getAvaliableOffers(offerList, event.type);

  const chosenOffers = formData.getAll(`event-offer`).map((chosenOffer) => {
    return avaliableOffers.find((offer) => {
      return chosenOffer === offer.title;
    });
  });

  return new EventModel({
    "base_price": formData.get(`event-price`),
    "date_from": start ? new Date(start) : ``,
    "date_to": end ? new Date(end) : ``,
    "destination": {
      "description": destination.description,
      "name": destination.name,
      "pictures": destination.pictures
    },
    "id": event.id,
    "is_favorite": !!isFavorite,
    "offers": chosenOffers,
    "type": formData.get(`event-type`)
  });
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, destinationList, offerList, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventComponent = new Event(event);
    this._eventEditComponent = new EditEvent(event, mode, destinationList, offerList);

    this._eventComponent.setEditBtnClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData, event, destinationList, offerList);
      this._eventEditComponent.setData({
        saveBtnText: `Saving...`
      });
      this._eventEditComponent.removeFlatpickr();
      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setCloseBtnClickHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setDeleteBtnClickHandler(() => {
      this._eventEditComponent.setData({
        deleteBtnText: `Deleting...`,
      });
      this._onDataChange(this, event, null);
    });

    if (mode === Mode.EDIT) {
      this._eventEditComponent.setFavoritesBtnClickHandler(() => {
        const newEvent = EventModel.clone(event);
        newEvent.isFavorite = !newEvent.isFavorite;
        this._onDataChange(this, event, newEvent);
      });
    }

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._eventComponent);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, ElementPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    const eventEditElement = this._eventEditComponent.getElement();

    eventEditElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    eventEditElement.style.border = `1px solid red`;

    setTimeout(() => {
      eventEditElement.style.animation = ``;
      eventEditElement.style.border = ``;
      this._eventEditComponent.setData({
        deleteBtnText: `Delete`,
        saveBtnText: `Save`
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
