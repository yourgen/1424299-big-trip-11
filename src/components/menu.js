import AbstractComponent from "./abstract-component.js";
import {capitalize} from "../utils/common";

import {MenuItem} from '../data/const';

const getMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a id="${MenuItem.TABLE}" class="trip-tabs__btn  trip-tabs__btn--active" href="#">${capitalize(MenuItem.TABLE)}</a>
    <a id="${MenuItem.STATS}" class="trip-tabs__btn" href="#">${capitalize(MenuItem.STATS)}</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return getMenuTemplate();
  }

  setActiveItem(menuItem) {
    this._removeActiveItem();

    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  _removeActiveItem() {
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    activeItem.classList.remove(`trip-tabs__btn--active`);
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }

}
