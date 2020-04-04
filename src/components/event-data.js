const EVENT_DATA = [
  [{
    day: 18,
    type: `taxi`,
    title: `Taxi to Amsterdam`,
    start: `10:30`,
    end: `11:00`,
    duration: `30M`,
    price: `20`,
    offers: [{
      name: `Order Uber`,
      price: `20`
    }]
  }, {
    day: 18,
    type: `flight`,
    title: `Flight to Chamonix`,
    start: `12:25`,
    end: `13:35`,
    duration: `1H 10M`,
    price: `160`,
    offers: [{
      name: `Add luggage`,
      price: `50`
    }, {
      name: `Switch to comfort`,
      price: `80`
    }]
  }, {
    day: 18,
    type: `drive`,
    title: `Drive to Chamonix`,
    start: `14:30`,
    end: `16:05`,
    duration: `1H 35M`,
    price: `160`,
    offers: [{
      name: `Rent a car`,
      price: `200`
    }]
  }, {
    day: 18,
    type: `check-in`,
    title: `Check-in in Chamonix`,
    start: `16:20`,
    end: `17:00`,
    duration: `40M`,
    price: `600`,
    offers: [{
      name: `Add breakfast`,
      price: `50`
    }]
  }], [{
    day: 19,
    type: `sightseeing`,
    title: `Sightseeing in Chamonix`,
    start: `13:00`,
    end: `14:20`,
    duration: `1H 20M`,
    price: `50`,
    offers: [{
      name: `Book tickets`,
      price: `40`
    }, {
      name: `Lunch in city`,
      price: `30`
    }]
  }, {
    day: 19,
    type: `drive`,
    title: `Drive to Geneva`,
    start: `16:00`,
    end: `17:00`,
    duration: `1H`,
    price: `20`,
    offers: []
  }, {
    day: 19,
    type: `flight`,
    title: `Flight to Geneva`,
    start: `18:00`,
    end: `19:00`,
    duration: `1H`,
    price: `20`,
    offers: [{
      name: `Add luggage`,
      price: `30`
    }, {
      name: `Switch to comfort`,
      price: `100`
    }]
  }], [{
    day: 20,
    type: `drive`,
    title: `Drive to Geneva`,
    start: `08:25`,
    end: `09:25`,
    duration: `1H`,
    price: `20`,
    offers: []
  }, {
    day: 20,
    type: `sightseeing`,
    title: `Sightseeing in Geneva`,
    start: `11:15`,
    end: `12:15`,
    duration: `1H`,
    price: `180`,
    offers: []
  }]
];

export {EVENT_DATA};
