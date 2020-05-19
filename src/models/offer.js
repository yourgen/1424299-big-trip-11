export default class Offer {
  constructor(data) {
    this.avaliableOffers = data[`offers`];
    this.offersType = data[`type`];
  }
  static parseOffer(data) {
    return new Offer(data);
  }
  static parseOffers(data) {
    return data.map(Offer.parseOffer);
  }
}
