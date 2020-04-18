import {tripPoints, newEventData, eventTypes, tripDestinations} from './data/event-data';

import TripInfo from './components/trip-info';
import RouteInfo from './components/route-info';
import TripCost from './components/trip-cost';
import Menu from './components/menu';
import Filter from './components/filter';
import Sorting from './components/sorting';
import TripDays from './components/trip-days';
import TripPoint from './components/trip-points';

import Event from './components/event';
import Offer from './components/offer';
import NewEvent from './components/event-new';
import NewEventTypeItem from './components/event-new-items';
import NewEventDestinationList from './components/event-new-destinations';
import NewEventOffer from './components/event-new-offers';
import NewEventPhoto from './components/event-new-photos';

import {render, renderPosition} from "./utils.js";

const tripStart = new Date();


const renderEventEditComponent = (newEventComponent) => {

  const transferTypes = [];
  const activityTypes = [];

  const formSubtypesList = (subtype, index) => {
    eventTypes[index].forEach((item) => {
      subtype.push(item.name);
    });
    subtype.forEach((eventType) => {
      const subtypeContainer = newEventComponent.querySelectorAll(`.event__type-group`)[index];
      render(subtypeContainer, new NewEventTypeItem(eventType, newEventData).getElement());
    });
  };
  formSubtypesList(transferTypes, 0);
  formSubtypesList(activityTypes, 1);

  const destinationListContainer = newEventComponent.querySelector(`#destination-list-1`);
  for (let destination of tripDestinations) {
    render(destinationListContainer, new NewEventDestinationList(destination).getElement());
  }

  const newEventOfferContainer = newEventComponent.querySelector(`.event__available-offers`);
  const avaliableOffers = [];
  eventTypes.forEach((item) => {
    item.forEach((eventType) => {
      if (eventType.name === newEventData.type) {
        avaliableOffers.push(...eventType.offers);
      }
    });
  });
  avaliableOffers.forEach((avaliableoffer, i) => {
    render(newEventOfferContainer, new NewEventOffer(avaliableoffer, i).getElement());
  });

  const newEventPhotosContainer = newEventComponent.querySelector(`.event__photos-tape`);
  newEventData.photos.map((photoLink) => {
    render(newEventPhotosContainer, new NewEventPhoto(photoLink).getElement());
  });

};

const renderTrip = (tripDaysComponent) => {
  tripPoints.map((eventlist, i) => {
    render(tripDaysComponent, new TripPoint(i, tripStart).getElement());
    const eventContainer = tripDaysComponent.querySelectorAll(`.trip-events__list`);
    eventlist.map((event, j) => {
      render(eventContainer[i], new Event(event, i, tripStart).getElement());
      const offerContainer = eventContainer[i].querySelectorAll(`.event__selected-offers`);
      event.offers.map((offer) => {
        render(offerContainer[j], new Offer(offer).getElement());
      });
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

const newEventComponent = new NewEvent(newEventData, tripStart);

render(mainElem, newEventComponent.getElement());
renderEventEditComponent(newEventComponent.getElement());

const tripDaysComponent = new TripDays();
render(mainElem, tripDaysComponent.getElement());
renderTrip(tripDaysComponent.getElement());
