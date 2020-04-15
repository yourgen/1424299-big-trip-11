import {tripDays} from "../data/event-data";

const tripCostTemplate = () => {
  const eventPrices = [];
  tripDays.forEach((eventlist) => {
    eventlist.forEach((event) => {
      eventPrices.push(event.price);
    });
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const tripCost = eventPrices.reduce(reducer);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
    </p>`
  );
};

export {tripCostTemplate};
