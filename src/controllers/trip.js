import RouteInfo from '../components/route-info';
import TripCost from '../components/trip-cost';
import Sorting, {SortingType} from '../components/sorting';
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

const getSortedEvents = (events, sortingType) => {
  let sortedEvents = [];
  events.forEach((eventlist) => {
    sortedEvents.push(...eventlist);
  });
  switch (sortingType) {
    case SortingType.DURATION:
      sortedEvents.sort((a, b) => b.duration - a.duration);
      break;
    case SortingType.PRICE:
      sortedEvents.sort((a, b) => b.price - a.price);
      break;
    case SortingType.DEFAULT:
      sortedEvents = events;
      break;
  }

  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortingComponent = new Sorting();
    this._tripDaysComponent = new TripDays();
    this._noPointsComponent = new NoPoints();
  }

  render(headerContainer, tripPoints, tripStart) {
    const container = this._container;
    if (tripPoints.length === 0) {
      render(container, this._noPointsComponent);
      return;
    }
    renderHeader(headerContainer.getElement(), tripStart);

    render(container, this._sortingComponent);
    render(container, this._tripDaysComponent);

    const tripDaysElement = this._tripDaysComponent.getElement();

    tripPoints.map((eventlist, dayCount) => {
      render(tripDaysElement, new TripPoint(dayCount, tripStart));

      const eventContainer = tripDaysElement.querySelectorAll(`.trip-events__list`);
      eventlist.map((event) => {
        renderEvent(eventContainer[dayCount], event, dayCount, tripStart);
      });
    });

    this._sortingComponent.setSortingTypeChangeHandler((sortingType) => {
      const sortedEvents = getSortedEvents(tripPoints, sortingType);
      tripDaysElement.innerHTML = ``;

      if (sortingType === SortingType.DEFAULT) {
        sortedEvents.map((eventlist, dayCount) => {
          render(tripDaysElement, new TripPoint(dayCount, tripStart));

          const eventContainer = tripDaysElement.querySelectorAll(`.trip-events__list`);
          eventlist.map((event) => {
            renderEvent(eventContainer[dayCount], event, dayCount, tripStart);
          });
        });
      } else {
        render(tripDaysElement, new TripPoint(0, tripStart));
        const eventCommonContainer = tripDaysElement.querySelector(`.trip-events__list`);
        sortedEvents.map((event) => {
          renderEvent(eventCommonContainer, event, 0, tripStart);
        });
      }
    });
  }
}
