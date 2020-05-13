import {getEventsByFilter} from "../utils/filter.js";
import {FilterType} from "../data/const";

export default class EventsModel {
  constructor() {
    this._events = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getAllEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
  }

  addEvent(event) {
    this._events.forEach((eventlist) => {
      eventlist = [].concat(event, eventlist);
      this._callHandlers(this._dataChangeHandlers);
    });
  }

  updateEvent(id, event) {
    this._events.forEach((eventlist) => {
      const index = eventlist.findIndex((it) => it.id === id);
      if (index === -1) {
        return false;
      }
      eventlist = [].concat(eventlist.slice(0, index), event, eventlist.slice(index + 1));

      this._callHandlers(this._dataChangeHandlers);

      return true;
    });
  }

  removeEvent(id) {
    this._events.forEach((eventlist) => {
      const index = eventlist.findIndex((it) => it.id === id);
      if (index === -1) {
        return false;
      }
      eventlist = [].concat(eventlist.slice(0, index), eventlist.slice(index + 1));

      this._callHandlers(this._dataChangeHandlers);

      return true;
    });
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
