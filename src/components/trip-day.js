import {formatTripDayDate, formatTripDayDateTime} from "../utils/common";
import AbstractComponent from "./abstract-component";
import moment from "moment";

const getTripDayTemplate = (dayCount, tripStart) => {
  const currentDate = moment(tripStart).add(dayCount - 1, `d`);
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      ${dayCount ? `
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${formatTripDayDateTime(currentDate)}">${formatTripDayDate(currentDate)}</time>
      ` : ``}
      </div>

      <ul class="trip-events__list">
        
      </ul>
    </li>`
  );
};

export default class TripDay extends AbstractComponent {
  constructor(dayCount, tripStart) {
    super();
    this._dayCount = dayCount;
    this._tripStart = tripStart;
  }

  getTemplate() {
    return getTripDayTemplate(this._dayCount, this._tripStart);
  }
}
