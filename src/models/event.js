export default class Event {
  constructor(data) {
    this.price = data[`base_price`];
    this.start = new Date(data[`date_from`]);
    this.end = new Date(data[`date_to`]);
    this.destination = data[`destination`]; // TODO
    this.id = data[`id`];
    this.isFavorite = data[`is_favorite`];
    this.offers = data[`offers`];
    this.type = data[`type`];
  }
  static parseEvent(data) {
    return new Event(data);
  }
  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }
}
