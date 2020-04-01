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

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElem = document.querySelector('.trip-main');

const siteHeaderElem = document.querySelector('.trip-main__trip-controls');

render(siteMainElem, createTripInfoTemplate(), `afterbegin`);

const tripInfoElem = siteMainElem.querySelector('.trip-main__trip-info');

render(tripInfoElem, createRouteInfoTemplate());
render(tripInfoElem, createTripCostTemplate());
