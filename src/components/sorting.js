import AbstractComponent from "./abstract-component.js";

export const SortingType = {
  DURATION: `duration`,
  PRICE: `price`,
  DEFAULT: `default`,
};

const getSortingTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input 
          id="sort-event" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort" 
          value="sort-event" 
          data-sorting-type="${SortingType.DEFAULT}" 
          checked
        >
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input 
          id="sort-time" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort" 
          value="sort-time" 
          data-sorting-type="${SortingType.DURATION}"
        >
        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input 
          id="sort-price" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort" 
          value="sort-price" 
          data-sorting-type="${SortingType.PRICE}"
        >
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

export default class Sorting extends AbstractComponent {
  constructor() {
    super();

    this._currentSortingType = SortingType.DEFAULT;
  }

  getTemplate() {
    return getSortingTemplate();
  }

  getSortingType() {
    return this._currentSortingType;
  }

  setSortingTypeChangeHandler(handler) {
    const sortingBtns = this.getElement().querySelectorAll(`input`);
    sortingBtns.forEach((btn) => {
      btn.addEventListener(`click`, (evt) => {
        const sortingType = evt.target.dataset.sortingType;

        if (this._currentSortingType === sortingType) {
          return;
        }

        this._currentSortingType = sortingType;

        handler(this._currentSortingType);
      });
    });
  }
}
