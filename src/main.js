import {tripPoints} from './data/event-data';

import TripInfo from './components/trip-info';
import RouteInfo from './components/route-info';
import TripCost from './components/trip-cost';
import Menu from './components/menu';
import Filter from './components/filter';
import Sorting from './components/sorting';
import TripDays from './components/trip-days';
import TripPoint from './components/trip-points';

import Event from './components/event';
import EditEvent from './components/event-edit';

import {render, renderPosition} from "./utils.js";

const tripStart = new Date();

const renderTrip = (tripDaysComponent) => {
  tripPoints.map((eventlist, dayCount) => {
    render(tripDaysComponent, new TripPoint(dayCount, tripStart).getElement());
    const eventContainer = tripDaysComponent.querySelectorAll(`.trip-events__list`);
    eventlist.map((event) => {
      render(eventContainer[dayCount], new Event(event, dayCount, tripStart).getElement());
    });
  });
};

const headerElem = document.querySelector(`.trip-main`);
const tripControlsElem = headerElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];

const tripInfoComponent = new TripInfo();
render(headerElem, tripInfoComponent.getElement(), renderPosition.AFTERBEGIN);
render(tripInfoComponent.getElement(), new RouteInfo(tripStart).getElement());
render(tripInfoComponent.getElement(), new TripCost(tripStart).getElement());
render(tripControlsHeaderElem, new Menu().getElement(), renderPosition.BEFOREBEGIN);
render(tripControlsElem, new Filter().getElement());

const mainElem = document.querySelector(`.trip-events`);
render(mainElem, new Sorting().getElement());

render(mainElem, new EditEvent(tripPoints[0][0], 0, tripStart).getElement());

const tripDaysComponent = new TripDays();
render(mainElem, tripDaysComponent.getElement());
renderTrip(tripDaysComponent.getElement());
