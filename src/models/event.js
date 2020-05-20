export default class EventModel {
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

  toRAW() {
    return {
      "base_price": this.price,
      "date_from": this.start.toISOString(),
      "date_to": this.end.toISOString(),
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
