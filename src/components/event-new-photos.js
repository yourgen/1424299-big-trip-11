import {createElement} from "../utils";

const getNewEventPhotoMarkUp = (photoLink) => {
  return (
    `<img class="event__photo" src="${photoLink}" alt="Event photo">`
  );
};

export default class NewEventPhoto {
  constructor(photoLink) {
    this._photoLink = photoLink;
    this._element = null;
  }

  getTemplate() {
    return getNewEventPhotoMarkUp(this._photoLink);
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
