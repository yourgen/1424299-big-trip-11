import Event from './models/event';
import Destination from './models/destination';
import Offer from './models/offer';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization, url) {
    this._authorization = authorization;
    this._url = url;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._url}points`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvents);
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._url}destinations`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Destination.parseDestinations);
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._url}offers`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Offer.parseOffers);
  }

  updateEvent(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`${this._url}points/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvent);
  }
}
