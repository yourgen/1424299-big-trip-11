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

import {render, replace, ElementPosition} from "./utils/render.js";

const tripStart = new Date();

const renderEvent = (container, event, dayCount, date) => {
  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new Event(event, dayCount, date);
  const eventEditComponent = new EditEvent(event, dayCount, date);

  eventComponent.setEditBtnClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, eventComponent);
};

const renderHeader = (container) => {
  render(container, new RouteInfo(tripStart));
  render(container, new TripCost(tripStart));
};

const renderTrip = () => {
  const mainElem = document.querySelector(`.trip-events`);

  if (tripPoints.length === 0) {
    render(mainElem, new NoPoints());
    return;
  }

  renderHeader(tripInfoComponent.getElement());

  render(mainElem, new Sorting());
  const tripDaysComponent = new TripDays();
  render(mainElem, tripDaysComponent);

  tripPoints.map((eventlist, dayCount) => {
    render(tripDaysComponent.getElement(), new TripPoint(dayCount, tripStart));
    const eventContainer = tripDaysComponent.getElement().querySelectorAll(`.trip-events__list`);
    eventlist.map((event) => {
      renderEvent(eventContainer[dayCount], event, dayCount, tripStart);
    });
  });
};

const headerElem = document.querySelector(`.trip-main`);
const tripControlsElem = headerElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];

const tripInfoComponent = new TripInfo();
render(headerElem, tripInfoComponent, ElementPosition.AFTERBEGIN);
render(tripControlsHeaderElem, new Menu(), ElementPosition.BEFOREBEGIN);
render(tripControlsElem, new Filter());

renderTrip();
