import {tripDays, tripDestinations} from "../data/event-data";
import {months} from '../data/common-data';

const routeInfoTemplate = (date) => {

  const normalizeArrMiddle = (arr) => {
    return arr.length % 2 === 0 ? arr[arr.length / 2] : arr[(arr.length - 1) / 2];
  };

  const day = date.getDate();
  const month = months[date.getMonth()];
  const middleDay = normalizeArrMiddle(tripDays);
  const lastDay = tripDays[tripDays.length - 1];
  const middleDestination = tripDestinations.size > 3 ? `...` : normalizeArrMiddle(middleDay).destination;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">
        ${tripDays[0][0].destination} &mdash; ${middleDestination} &mdash; ${lastDay[lastDay.length - 1].destination}
      </h1>

      <p class="trip-info__dates">${month} ${day}&nbsp;&mdash;&nbsp;${day + tripDays.length - 1}</p>
    </div>`
  );
};

export {routeInfoTemplate};
