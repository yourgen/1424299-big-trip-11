export default class Offer {
  constructor(data) {
    this.offers = data[`offers`];
    this.type = data[`type`];
  }
  static parseOffer(data) {
    return new Offer(data);
  }
  static parseOffers(data) {
    return data.map(Offer.parseOffer);
  }
}
