import {createElement, castTimeFormat} from "../utils/common";
import {months} from '../data/common-data';

const getTripPointTemplate = (dayCount, date) => {

  const day = date.getDate();
  const monthText = months[date.getMonth()];
  const monthNum = castTimeFormat(date.getMonth());
  const year = date.getFullYear();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount + 1}</span>
        <time class="day__date" datetime="${year}-${monthNum}-${day + dayCount}">${monthText.toUpperCase()} ${day + dayCount}</time>
      </div>

      <ul class="trip-events__list">
        
      </ul>
    </li>`
  );
};

export default class TripPoint {
  constructor(dayCount, date) {
    this._dayCount = dayCount;
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return getTripPointTemplate(this._dayCount, this._date);
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
