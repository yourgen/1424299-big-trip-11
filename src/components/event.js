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

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export {createEvent};
