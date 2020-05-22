import {formatTripDayDate, formatTripDayDateTime} from "../utils/common";
import AbstractComponent from "./abstract-component";

const getTripDayTemplate = (dayCount, date) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      ${dayCount ? `
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${formatTripDayDateTime(date)}">${formatTripDayDate(date)}</time>
      ` : ``}
      </div>

      <ul class="trip-events__list">
        
      </ul>
    </li>`
  );
};

export default class TripDay extends AbstractComponent {
  constructor(dayCount, date) {
    super();
    this._dayCount = dayCount;
    this._date = date;
  }

  getTemplate() {
    return getTripDayTemplate(this._dayCount, this._date);
  }
}
