import {tripDays} from "../data/event-data";
import {months} from '../data/common-data';

const routeInfoTemplate = (date) => {

  const day = date.getDate();
  const month = months[date.getMonth()];

  const tripDestinations = new Set();
  tripDays.forEach((eventlist) => {
    eventlist.forEach((event) => {
      tripDestinations.add(event.destination);
    });
  });

  const middleDay = tripDays[tripDays.length / 2];
  const lastDay = tripDays[tripDays.length - 1];

  const middleDestination = tripDestinations.size > 3 ? `...` : middleDay[middleDay.length / 2].destination;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">
        ${tripDays[0][0].destination} &mdash; ${middleDestination} &mdash; ${lastDay[lastDay.length - 1].destination}
      </h1>

      <p class="trip-info__dates">${month} ${day}&nbsp;&mdash;&nbsp;${day + tripDays.length}</p>
    </div>`
  );
};

export {routeInfoTemplate};
