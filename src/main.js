import {tripDays} from './data/event-data';

import {tripInfoTemplate} from './components/trip-info';
import {routeInfoTemplate} from './components/route-info';
import {tripCostTemplate} from './components/trip-cost';
import {menuTemplate} from './components/menu';
import {filterTemplate} from './components/filter';
import {sortingTemplate} from './components/sorting';
import {newEventTemplate} from './components/event-new';
import {tripDaysTemplate} from './components/trip-days';
import {tripPointTemplate} from './components/trip-points';
import {createEvent} from './components/event';
import {createOffer} from './components/offer';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripStart = new Date();

const headerElem = document.querySelector(`.trip-main`);
const tripControlsElem = headerElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];

render(headerElem, tripInfoTemplate(), `afterbegin`);
render(tripControlsHeaderElem, menuTemplate(), `beforebegin`);
render(tripControlsElem, filterTemplate());

const tripInfoElem = headerElem.querySelector(`.trip-main__trip-info`);
render(tripInfoElem, routeInfoTemplate(tripStart));
render(tripInfoElem, tripCostTemplate());

const mainElem = document.querySelector(`.trip-events`);
render(mainElem, sortingTemplate());
render(mainElem, newEventTemplate());
render(mainElem, tripDaysTemplate());

const tripDaysContainer = mainElem.querySelector(`.trip-days`);

tripDays.map((eventlist, i) => {
  render(tripDaysContainer, tripPointTemplate(i, tripStart));
  const eventContainer = tripDaysContainer.querySelectorAll(`.trip-events__list`);
  eventlist.map((event, j) => {
    render(eventContainer[i], createEvent(event));
    const offerContainer = eventContainer[i].querySelectorAll(`.event__selected-offers`);
    event.offers.map((offer) => {
      render(offerContainer[j], createOffer(offer));
    });
  });
});
