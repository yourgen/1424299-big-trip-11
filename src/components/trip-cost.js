import {sortEventsByDate} from '../utils/common';
import AbstractComponent from './abstract-component';

const getTripCostTemplate = (events) => {
  const sortedEvents = sortEventsByDate(events);

  const countTripCost = () => {
    const tripCost = [];
    sortedEvents.forEach((event) => {
      tripCost.push(event.price);
    });
    return tripCost.reduce((acc, value) => acc + value);
  };

  return (
    `<p class="trip-info__cost">
      Total: &euro; <span class="trip-info__cost-value">${countTripCost()}</span>
    </p>`
  );
};

export default class TripCost extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return getTripCostTemplate(this._events);
  }
}
