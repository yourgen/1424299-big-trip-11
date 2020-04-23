import {tripPoints} from './data/event-data';

import TripInfo from './components/trip-info';
import RouteInfo from './components/route-info';
import TripCost from './components/trip-cost';
import Menu from './components/menu';
import Filter from './components/filter';
import Sorting from './components/sorting';
import TripDays from './components/trip-days';
import TripPoint from './components/trip-point';
import NoPoints from "./components/no-points";

import Event from './components/event';
import EditEvent from './components/event-edit';

import {render, ElementPosition} from "./utils/render.js";

const tripStart = new Date();

const renderEvent = (container, event, dayCount, date) => {
  const replaceEventToEdit = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new Event(event, dayCount, date);
  const editBtn = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editBtn.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EditEvent(event, dayCount, date);
  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, eventComponent.getElement());
};

const renderHeader = (container) => {
  render(container.getElement(), new RouteInfo(tripStart).getElement());
  render(container.getElement(), new TripCost(tripStart).getElement());
};

const renderTrip = () => {
  const mainElem = document.querySelector(`.trip-events`);
  if (tripPoints.length === 0) {
    render(mainElem, new NoPoints().getElement());
    return;
  }
  renderHeader(tripInfoComponent);

  render(mainElem, new Sorting().getElement());
  const tripDaysComponent = new TripDays().getElement();
  render(mainElem, tripDaysComponent);

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
render(headerElem, tripInfoComponent.getElement(), ElementPosition.AFTERBEGIN);
render(tripControlsHeaderElem, new Menu().getElement(), ElementPosition.BEFOREBEGIN);
render(tripControlsElem, new Filter().getElement());

renderTrip();
