import {tripPoints} from "../data/event-data";
import AbstractComponent from "./abstract-component.js";

const getTripCostTemplate = () => {
  const countTripCost = () => {
    const tripCost = [];
    tripPoints.forEach((eventlist) => {
      eventlist.forEach((event) => {
        tripCost.push(event.price);
      });
    });
    return tripCost.reduce((acc, value) => acc + value);
  };

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${countTripCost()}</span>
    </p>`
  );
};

export default class TripCost extends AbstractComponent {
  getTemplate() {
    return getTripCostTemplate();
  }
}
