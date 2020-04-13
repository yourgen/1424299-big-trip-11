export const eventTypeMarkup = (eventtype, event) => {
  return (
    `<div class="event__type-item">
      <input 
      id="event-type-${eventtype.toLowerCase()}-1" 
      class="event__type-input  visually-hidden" 
      type="radio" 
      name="event-type" 
      value="${eventtype.toLowerCase()}"
      ${eventtype.toLowerCase() === event.type.toLowerCase() ? `checked` : ``}
      >
      <label 
      class="event__type-label  event__type-label--${eventtype.toLowerCase()}" 
      for="event-type-${eventtype.toLowerCase()}-1"
      >
      ${eventtype}
      </label>
    </div>`
  );
};
