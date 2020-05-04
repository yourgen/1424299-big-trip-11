import {castTimeFormat} from "../utils/common";
import {months} from '../data/common-data';
import AbstractComponent from "./abstract-component.js";


const getTripPointTemplate = (dayCount, date) => {
  const day = date.getDate();
  const monthText = months[date.getMonth()];
  const monthNum = castTimeFormat(date.getMonth());
  const year = date.getFullYear();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      ${dayCount ? `
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${year}-${monthNum}-${day - 1 + dayCount}">${monthText.toUpperCase()} ${day - 1 + dayCount}</time>
      ` : ``}
      </div>

      <ul class="trip-events__list">
        
      </ul>
    </li>`
  );
};

export default class TripPoint extends AbstractComponent {
  constructor(dayCount, date) {
    super();
    this._dayCount = dayCount;
    this._date = date;
  }

  getTemplate() {
    return getTripPointTemplate(this._dayCount, this._date);
  }
}
