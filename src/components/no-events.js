import AbstractComponent from "./abstract-component.js";

const getNoPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first event
    </p>`
  );
};


export default class NoEvents extends AbstractComponent {
  getTemplate() {
    return getNoPointsTemplate();
  }
}
