import API from './api';

import TripInfo from './components/trip-info';
import Menu from './components/menu';

import FilterController from './controllers/filter';
import TripController from './controllers/trip';

import EventsModel from './models/events';

import {render, ElementPosition} from './utils/render';

const AUTHORIZATION = `Basic diuy32brbd1iubwdsb1wd=`;

const api = new API(AUTHORIZATION);

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

const tripController = new TripController(mainElem, tripInfoComponent, eventsModel);

const addNewEventBtn = document.querySelector(`.trip-main__event-add-btn`);

addNewEventBtn.addEventListener(`click`, () => {
  tripController.createEvent();
});

api.getEvents()
  .then((events) => {
    eventsModel.setEvents(events);
    tripController.render();
  });
