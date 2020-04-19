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

const renderEvent = (container, event, dayCount, date) => {
  const replaceEventToEdit = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const eventComponent = new Event(event, dayCount, date);
  const editBtn = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editBtn.addEventListener(`click`, () => {
    replaceEventToEdit();
  });

  const eventEditComponent = new EditEvent(event, dayCount, date);
  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
  });

  render(container, eventComponent.getElement());
};

const renderTrip = (tripDaysComponent) => {
  tripPoints.map((eventlist, dayCount) => {
    render(tripDaysComponent, new TripPoint(dayCount, tripStart).getElement());
    const eventContainer = tripDaysComponent.querySelectorAll(`.trip-events__list`);
    eventlist.map((event) => {
      renderEvent(eventContainer[dayCount], event, dayCount, tripStart);
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

const tripDaysComponent = new TripDays();
render(mainElem, tripDaysComponent.getElement());
renderTrip(tripDaysComponent.getElement());
