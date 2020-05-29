import API from './api';

import TripInfo from './components/trip-info';
import Menu from './components/menu';
import Stats from './components/stats';

import FilterController from './controllers/filter';
import TripController from './controllers/trip';

import EventsModel from './models/events';

import {render, ElementPosition} from './utils/render';

import {MenuItem, AUTHORIZATION, END_POINT} from './data/const';

const api = new API(AUTHORIZATION, END_POINT);

const eventsModel = new EventsModel();

const headerElem = document.querySelector(`.trip-main`);
const tripControlsElem = headerElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];
const mainElem = document.querySelector(`.trip-events`);
const addNewEventBtn = document.querySelector(`.trip-main__event-add-btn`);

const tripInfoComponent = new TripInfo();
const menuComponent = new Menu();
const statsComponent = new Stats(eventsModel);

render(mainElem, statsComponent);
statsComponent.hide();

render(headerElem, tripInfoComponent, ElementPosition.AFTERBEGIN);
render(tripControlsHeaderElem, menuComponent, ElementPosition.BEFOREBEGIN);

const filterController = new FilterController(tripControlsElem, eventsModel);
filterController.render();

const tripController = new TripController(mainElem, tripInfoComponent, addNewEventBtn, eventsModel, api);

const switchToTable = () => {
  menuComponent.setActiveItem(MenuItem.TABLE);
  statsComponent.hide();
  tripController.show();
};

addNewEventBtn.addEventListener(`click`, () => {
  switchToTable();
  tripController.resetSorting();
  filterController.resetFilter();
  tripController.createEvent();
});

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      switchToTable();
      break;
    case MenuItem.STATS:
      menuComponent.setActiveItem(MenuItem.STATS);
      tripController.hide();
      statsComponent.show();
      break;
  }
});

Promise.all([api.getEvents(), api.getDestinations(), api.getOffers()])
  .then(([events, destinations, offers]) => {
    eventsModel.setEvents(events);
    eventsModel.setDestinations(destinations);
    eventsModel.setOffers(offers);
    tripController.render();
  });
