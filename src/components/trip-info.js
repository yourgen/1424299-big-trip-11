import AbstractComponent from "./abstract-component.js";

const getTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class TripInfo extends AbstractComponent {
  getTemplate() {
    return getTripInfoTemplate();
  }
}
