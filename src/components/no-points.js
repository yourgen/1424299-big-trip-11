import AbstractComponent from "./abstract-component.js";

const getNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};


export default class NoPoints extends AbstractComponent {
  getTemplate() {
    return getNoPointsTemplate();
  }
}
