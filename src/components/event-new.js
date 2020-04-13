import {castTimeFormat} from "../utils";

const newEventTemplate = (event, date) => {

  const normalizeFormData = (data, defaultData = ``) => {
    return data ? data : defaultData;
  };

  const getEventTitle = () => {
    if (event.type === `Check-in` || event.type === `Sightseeing` || event.type === `Restaurant`) {
      return `${event.type} in `;
    } else {
      return `${event.type} to `;
    }
  };
  const day = date.getDate();
  const monthNum = castTimeFormat(date.getMonth());
  const year = date.getFullYear() % 100;
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  const getEventDate = () => {
    return (
      `${normalizeFormData(day)}/${normalizeFormData(monthNum)}/${normalizeFormData(year)} ${normalizeFormData(hours)}:${normalizeFormData(minutes)}`
    );
  };
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${normalizeFormData(event.type).toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${normalizeFormData(getEventTitle())} 
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-1" 
            type="text" 
            name="event-destination" 
            value="${normalizeFormData(event.destination)}" 
            list="destination-list-1"
          >
          <datalist id="destination-list-1">

          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getEventDate()}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getEventDate()}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${normalizeFormData(event.price)}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            
          </div>
        </section>
      </section>
    </form>`
  );
};


export {newEventTemplate};
