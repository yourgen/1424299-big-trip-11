"use strict";

const TRIP_DAYS = [1, 2, 3];

const createTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

const createRouteInfoTemplate = () => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};

const createTripCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

const createFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

const createSortingTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

const createNewEventTemplate = () => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">Add luggage</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">30</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
              <label class="event__offer-label" for="event-offer-comfort-1">
                <span class="event__offer-title">Switch to comfort class</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">100</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
              <label class="event__offer-label" for="event-offer-meal-1">
                <span class="event__offer-title">Add meal</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">15</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
              <label class="event__offer-label" for="event-offer-seats-1">
                <span class="event__offer-title">Choose seats</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">5</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
              <label class="event__offer-label" for="event-offer-train-1">
                <span class="event__offer-title">Travel by train</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">40</span>
              </label>
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

const createTripPointsContainer = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

const createTripPointTemplate = (day) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-${17 + day}">MAR ${17 + day}</time>
      </div>

      <ul class="trip-events__list">
        
      </ul>
    </li>`
  );
};

const createEvent = (event) => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${event.title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-${event.day}T${event.start}">${event.start}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-${event.day}T${event.end}">${event.end}</time>
          </p>
          <p class="event__duration">${event.duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${event.offer1.name}</span>
            ${event.offer1.symbol}
            ${event.offer1.currency}&nbsp;<span class="event__offer-price">${event.offer1.price}</span>
          </li>
          <li class="event__offer">
            <span class="event__offer-title">${event.offer2.name}</span>
            ${event.offer2.symbol}
            ${event.offer2.currency}&nbsp;<span class="event__offer-price">${event.offer2.price}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElem = document.querySelector(`.trip-main`);
const tripControlsElem = siteHeaderElem.querySelector(`.trip-main__trip-controls`);
const tripControlsHeaderElem = tripControlsElem.querySelectorAll(`h2`)[1];

render(siteHeaderElem, createTripInfoTemplate(), `afterbegin`);
render(tripControlsHeaderElem, createSiteMenuTemplate(), `beforebegin`);
render(tripControlsElem, createFilterTemplate());

const tripInfoElem = siteHeaderElem.querySelector(`.trip-main__trip-info`);
render(tripInfoElem, createRouteInfoTemplate());
render(tripInfoElem, createTripCostTemplate());

const siteMainElem = document.querySelector(`.trip-events`);
render(siteMainElem, createSortingTemplate());
render(siteMainElem, createNewEventTemplate());
render(siteMainElem, createTripPointsContainer());

const tripPointsContainer = siteMainElem.querySelector(`.trip-days`);

TRIP_DAYS.forEach((day) => {
  render(tripPointsContainer, createTripPointTemplate(day));
});

const dayOneEvents = [{
  day: 18,
  type: `taxi`,
  title: `Taxi to Amsterdam`,
  start: `10:30`,
  end: `11:00`,
  duration: `30M`,
  price: `20`,
  offer1: {
    name: `Order Uber`,
    symbol: `&plus;`,
    price: `20`,
    currency: `&euro;`
  },
  offer2: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  }
}, {
  day: 18,
  type: `flight`,
  title: `Flight to Chamonix`,
  start: `12:25`,
  end: `13:35`,
  duration: `1H 10M`,
  price: `160`,
  offer1: {
    name: `Add luggage`,
    symbol: `&plus;`,
    price: `50`,
    currency: `&euro;`
  },
  offer2: {
    name: `Switch to comfort`,
    symbol: `&plus;`,
    price: `80`,
    currency: `&euro;`
  }
}, {
  day: 18,
  type: `drive`,
  title: `Drive to Chamonix`,
  start: `14:30`,
  end: `16:05`,
  duration: `1H 35M`,
  price: `160`,
  offer1: {
    name: `Rent a car`,
    symbol: `&plus;`,
    price: `200`,
    currency: `&euro;`
  },
  offer2: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  }
}, {
  day: 18,
  type: `check-in`,
  title: `Check-in in Chamonix`,
  start: `16:20`,
  end: `17:00`,
  duration: `40M`,
  price: `600`,
  offer1: {
    name: `Add breakfast`,
    symbol: `&plus;`,
    price: `50`,
    currency: `&euro;`
  },
  offer2: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  }
}];
const dayTwoEvents = [{
  day: 19,
  type: `sightseeing`,
  title: `Sightseeing in Chamonix`,
  start: `13:00`,
  end: `14:20`,
  duration: `1H 20M`,
  price: `50`,
  offer1: {
    name: `Book tickets`,
    symbol: `&plus;`,
    price: `40`,
    currency: `&euro;`
  },
  offer2: {
    name: `Lunch in city`,
    symbol: `&plus;`,
    price: `30`,
    currency: `&euro;`
  }
}, {
  day: 19,
  type: `drive`,
  title: `Drive to Geneva`,
  start: `16:00`,
  end: `17:00`,
  duration: `1H`,
  price: `20`,
  offer1: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  },
  offer2: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  }
}, {
  day: 19,
  type: `flight`,
  title: `Flight to Geneva`,
  start: `18:00`,
  end: `19:00`,
  duration: `1H`,
  price: `20`,
  offer1: {
    name: `Add luggage`,
    symbol: `&plus;`,
    price: `30`,
    currency: `&euro;`
  },
  offer2: {
    name: `Switch to comfort`,
    symbol: `&plus;`,
    price: `100`,
    currency: `&euro;`
  }
}];
const dayThreeEvents = [{
  day: 20,
  type: `drive`,
  title: `Drive to Geneva`,
  start: `08:25`,
  end: `09:25`,
  duration: `1H`,
  price: `20`,
  offer1: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  },
  offer2: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  }
}, {
  day: 20,
  type: `sightseeing`,
  title: `Sightseeing in Geneva`,
  start: `11:15`,
  end: `12:15`,
  duration: `1H`,
  price: `180`,
  offer1: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  },
  offer2: {
    name: ` `,
    symbol: ` `,
    price: ` `,
    currency: ` `
  }
}];
const eventListByDay = [dayOneEvents, dayTwoEvents, dayThreeEvents];

const eventContainer = tripPointsContainer.querySelectorAll(`.trip-events__list`);

eventListByDay.map((eventlist, i) => {
  let container = eventContainer[i];
  eventlist.map((event) => {
    render(container, createEvent(event));
  });
});
