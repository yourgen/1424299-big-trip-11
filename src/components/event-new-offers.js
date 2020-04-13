import {getRandomNumber} from "../utils.js";

export const newEventOffersMarkUp = (avaliableoffer, i) => {
  const checkRandomizer = () => {
    return Math.random() > 0.5 ? `checked` : ``;
  };

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="event-offer" ${checkRandomizer()}>
      <label class="event__offer-label" for="event-offer-${i}">
        <span class="event__offer-title">${avaliableoffer}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${getRandomNumber(0, 100)}</span>
      </label>
    </div>`
  );
};


