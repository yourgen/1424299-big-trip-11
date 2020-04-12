import {castTimeFormat} from "../utils";
import {months} from '../data/common-data';

const tripPointTemplate = (daycount, date) => {

  const day = date.getDate();
  const monthText = months[date.getMonth()];
  const monthNum = castTimeFormat(date.getMonth());
  const year = date.getFullYear();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${daycount + 1}</span>
        <time class="day__date" datetime="${year}-${monthNum}-${day + daycount}">${monthText.toUpperCase()} ${day + daycount}</time>
      </div>

      <ul class="trip-events__list">
        
      </ul>
    </li>`
  );
};

export {tripPointTemplate};
