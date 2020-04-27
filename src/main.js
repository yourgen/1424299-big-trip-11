import {tripPoints, tripEvents} from './data/event-data';

import TripInfo from './components/trip-info';
import Menu from './components/menu';
import Filter from './components/filter';

import TripController from "./controllers/trip";

import {render, ElementPosition} from "./utils/render.js";

const tripStart = new Date();

const headerElem = document.querySelector(`.trip-main`);
const tripControlsElem = headerElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];
const mainElem = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfo();
render(headerElem, tripInfoComponent, ElementPosition.AFTERBEGIN);
render(tripControlsHeaderElem, new Menu(), ElementPosition.BEFOREBEGIN);
render(tripControlsElem, new Filter());

const tripController = new TripController(mainElem);
tripController.render(tripInfoComponent, tripPoints, tripEvents, tripStart);
