import API from './api';

import TripInfo from './components/trip-info';
import Menu from './components/menu';

import FilterController from './controllers/filter';
import TripController from './controllers/trip';

import EventsModel from './models/events';

import {render, ElementPosition} from './utils/render';

const AUTHORIZATION = `Basic diuy32brbd1iubwdsb1wd=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(AUTHORIZATION, END_POINT);

const eventsModel = new EventsModel();

const headerElem = document.querySelector(`.trip-main`);
const tripControlsElem = headerElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];
const mainElem = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfo();

render(headerElem, tripInfoComponent, ElementPosition.AFTERBEGIN);
render(tripControlsHeaderElem, new Menu(), ElementPosition.BEFOREBEGIN);

const filterController = new FilterController(tripControlsElem, eventsModel);
filterController.render();

const tripController = new TripController(mainElem, tripInfoComponent, eventsModel, api);

const addNewEventBtn = document.querySelector(`.trip-main__event-add-btn`);

addNewEventBtn.addEventListener(`click`, () => {
  tripController.createEvent();
});

Promise.all([api.getEvents(), api.getDestinations(), api.getOffers()])
  .then(([events, destinations, offers]) => {
    eventsModel.setEvents(events);
    eventsModel.setDestinations(destinations);
    eventsModel.setOffers(offers);
    tripController.render();
  });

