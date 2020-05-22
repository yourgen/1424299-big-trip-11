export default class EventModel {
  constructor(data) {
    this.price = data[`base_price`];
    this.start = data[`date_from`] ? new Date(data[`date_from`]) : null;
    this.end = data[`date_to`] ? new Date(data[`date_to`]) : null;
    this.destination = data[`destination`];
    this.id = data[`id`];
    this.isFavorite = data[`is_favorite`];
    this.offers = data[`offers`] || [];
    this.type = data[`type`];
  }

  toRAW() {
    return {
      "base_price": this.price,
      "date_from": this.start ? this.start.toISOString() : null,
      "date_to": this.end ? this.end.toISOString() : null,
      "destination": this.destination,
      "id": this.id,
      "is_favorite": this.isFavorite,
      "offers": this.offers,
      "type": this.type,
    };
  }

  static parseEvent(data) {
    return new EventModel(data);
  }
  static parseEvents(data) {
    return data.map(EventModel.parseEvent);
  }
  static clone(data) {
    return new EventModel(data.toRAW());
  }
}
