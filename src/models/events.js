export default class EventsModel {
  constructor() {
    this._events = [];

    this._dataChangeHandlers = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
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

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}