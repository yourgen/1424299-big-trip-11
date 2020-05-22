export default class OfferModel {
  constructor(data) {
    this.avaliableOffers = data[`offers`];
    this.offersType = data[`type`];
  }
  static parseOffer(data) {
    return new OfferModel(data);
  }
  static parseOffers(data) {
    return data.map(OfferModel.parseOffer);
  }
}
