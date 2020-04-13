import {tripDays, newEventData, eventTypes, tripDestinations} from './data/event-data';

import {tripInfoTemplate} from './components/trip-info';
import {routeInfoTemplate} from './components/route-info';
import {tripCostTemplate} from './components/trip-cost';
import {menuTemplate} from './components/menu';
import {filterTemplate} from './components/filter';
import {sortingTemplate} from './components/sorting';
import {newEventTemplate} from './components/event-new';
import {eventTypeMarkup} from './components/event-new-items';
import {destinationListMarkup} from './components/event-new-destinations';
import {newEventOffersMarkUp} from './components/event-new-offers';
import {newEventPhotoMarkUp} from './components/event-new-photos';
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
render(mainElem, newEventTemplate(newEventData, tripStart));

const transferTypes = [];
const activityTypes = [];
const newEventContainer = mainElem.querySelector(`.trip-events__item`);

const formSubtypesList = (subtype, index) => {
  eventTypes[index].forEach((item) => {
    subtype.push(item.name);
  });
  subtype.forEach((eventtype) => {
    const subtypeContainer = newEventContainer.querySelectorAll(`.event__type-group`)[index];
    render(subtypeContainer, eventTypeMarkup(eventtype, newEventData));
  });
};
formSubtypesList(transferTypes, 0);
formSubtypesList(activityTypes, 1);

const destinationListContainer = newEventContainer.querySelector(`#destination-list-1`);
for (let destination of tripDestinations) {
  render(destinationListContainer, destinationListMarkup(destination));
}

const newEventOfferContainer = newEventContainer.querySelector(`.event__available-offers`);
const avaliableOffers = [];
eventTypes.forEach((item) => {
  item.forEach((eventtype) => {
    if (eventtype.name === newEventData.type) {
      avaliableOffers.push(...eventtype.offers);
    }
  });
});
avaliableOffers.forEach((avaliableoffer, i) => {
  render(newEventOfferContainer, newEventOffersMarkUp(avaliableoffer, i));
});

const newEventPhotosContainer = newEventContainer.querySelector(`.event__photos-tape`);
newEventData.photos.map((photo) => {
  render(newEventPhotosContainer, newEventPhotoMarkUp(photo));
});

render(mainElem, tripDaysTemplate());

const tripDaysContainer = mainElem.querySelector(`.trip-days`);

tripDays.map((eventlist, i) => {
  render(tripDaysContainer, tripPointTemplate(i, tripStart));
  const eventContainer = tripDaysContainer.querySelectorAll(`.trip-events__list`);
  eventlist.map((event, j) => {
    render(eventContainer[i], createEvent(event, i, tripStart));
    const offerContainer = eventContainer[i].querySelectorAll(`.event__selected-offers`);
    event.offers.map((offer) => {
      render(offerContainer[j], createOffer(offer));
    });
  });
});
