"use strict";

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

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElem = document.querySelector('.trip-main');
const tripControlsElem = siteMainElem.querySelector('.trip-main__trip-controls');
const tripControlsHeaderElem = tripControlsElem.querySelectorAll('h2')[1];
console.log(tripControlsHeaderElem);


render(siteMainElem, createTripInfoTemplate(), `afterbegin`);
render(tripControlsHeaderElem, createSiteMenuTemplate(), `beforebegin`);
render(tripControlsElem, createFilterTemplate());


const tripInfoElem = siteMainElem.querySelector('.trip-main__trip-info');

render(tripInfoElem, createRouteInfoTemplate());
render(tripInfoElem, createTripCostTemplate());
