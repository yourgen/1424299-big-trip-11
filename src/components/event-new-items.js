import {createElement} from "../utils";

export const getEventTypeMarkup = (eventType, event) => {
  return (
    `<div class="event__type-item">
      <input 
        id="event-type-${eventType.toLowerCase()}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${eventType.toLowerCase()}"
        ${eventType.toLowerCase() === event.type.toLowerCase() ? `checked` : ``}
      >
      <label 
        class="event__type-label  event__type-label--${eventType.toLowerCase()}" 
        for="event-type-${eventType.toLowerCase()}-1"
      >
      ${eventType}
      </label>
    </div>`
  );
};

export default class NewEventTypeItem {
  constructor(eventType, event) {
    this._eventType = eventType;
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return getEventTypeMarkup(this._eventType, this._event);
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
