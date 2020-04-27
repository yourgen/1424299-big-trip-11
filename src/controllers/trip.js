import RouteInfo from '../components/route-info';
import TripCost from '../components/trip-cost';
import Sorting from '../components/sorting';
import TripDays from '../components/trip-days';
import TripPoint from '../components/trip-point';
import NoPoints from "../components/no-points";
import Event from '../components/event';
import EditEvent from '../components/event-edit';

import {render, replace} from "../utils/render.js";

const renderHeader = (container, tripStart) => {
  render(container, new RouteInfo(tripStart));
  render(container, new TripCost(tripStart));
};

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

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortingComponent = new Sorting();
    this._tripDaysComponent = new TripDays();
    this._noPointsComponent = new NoPoints();
  }

  render(headerContainer, tripPoints, tripEvents, tripStart) {
    const container = this._container;
    if (tripPoints.length === 0) {
      render(container, this._noPointsComponent);
      return;
    }
    renderHeader(headerContainer.getElement(), tripStart);

    render(container, this._sortingComponent);
    render(container, this._tripDaysComponent);

    tripPoints.map((eventlist, dayCount) => {
      render(this._tripDaysComponent.getElement(), new TripPoint(dayCount, tripStart));
      const eventContainer = this._tripDaysComponent.getElement().querySelectorAll(`.trip-events__list`);
      eventlist.map((event) => {
        renderEvent(eventContainer[dayCount], event, dayCount, tripStart);
      });
    });

    this._sortingComponent.setSortingTypeChangeHandler(() => {

    });
  }
}
