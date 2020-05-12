import {tripEvents} from './data/event-data';

import TripInfo from './components/trip-info';
import Menu from './components/menu';

import FilterController from './controllers/filter';
import TripController from "./controllers/trip";

import EventsModel from "./models/events";

import {render, ElementPosition} from "./utils/render.js";

const eventsModel = new EventsModel();
eventsModel.setEvents(tripEvents);

const headerElem = document.querySelector(`.trip-main`);
const tripControlsElem = headerElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];
const mainElem = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfo();
render(headerElem, tripInfoComponent, ElementPosition.AFTERBEGIN);
render(tripControlsHeaderElem, new Menu(), ElementPosition.BEFOREBEGIN);
const filterController = new FilterController(tripControlsElem, eventsModel);
filterController.render();

const tripController = new TripController(mainElem, eventsModel);
tripController.render(tripInfoComponent);
