import {getRandomNumber, arrPicker, castTimeFormat} from "../utils/common.js";

const EVENT_COUNT = 20;
const MAX_EVENT_PER_DAY = 4;
const TRIP_DURATION = 5;
const MAX_OFFER_COUNT = 3;

const eventTypes = [
  [
    {name: `Taxi`, offers: [`Switch to comfort`, `Switch to comfort plus`, `Switch to business`, `Switch to premium`, `Switch to minivan`]},
    {name: `Bus`, offers: [`Switch to comfort`, `Switch to business`, `Switch to express`, `On-board catering`, `Access to priority services`]},
    {name: `Train`, offers: [`Switch to comfort`, `Switch to business`, `Switch to express`, `On-board catering`, `Access to priority services`]},
    {name: `Ship`, offers: [`Switch to comfort`, `Switch to business`, `Pool pass`, `Bar card`, `Lounge pass`]},
    {name: `Transport`, offers: [`Switch to comfort`, `Switch to business`, `Switch to express`, `On-board catering`, `Access to priority services`]},
    {name: `Drive`, offers: [`Rent economy-class car`, `Rent premium-class car`, `Rent sport car`, `Rent bike`, `Rent sport bike`]},
    {name: `Flight`, offers: [`Add luggage`, `Switch to business`, `Choose seats`, `Baggage carrier`, `Access to lounge`]}
  ], [
    {name: `Check-in`, offers: [`Add breakfast`, `Add lunch`, `Transfer to hotel`, `Luggage Forwarding`]},
    {name: `Sightseeing`, offers: [`Book tickets`, `Museum`, `All-day tour guide`, `Part-day tour guide`]},
    {name: `Restaurant`, offers: [`Try luxury-class`, `Advanced meal`]}
  ]
];

const destinations = [
  `Amsterdam`, `London`, `Paris`, `Prague`, `Rome`
];

const descriptionTemplates = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

const generateEvent = () => {

  const getEventType = arrPicker(eventTypes[Math.round(Math.random())]);

  const generateOffers = (count, eventType) => {
    const shuffledOffers = eventType.offers.sort(() => Math.random() - 0.5);
    return shuffledOffers
      .slice(0, count)
      .map((offer) => {
        return {
          name: offer,
          price: getRandomNumber(0, 100)
        };
      });
  };

  const descrSentenceCount = getRandomNumber(1, descriptionTemplates.length);
  const generateDescription = (count) => {
    const descriptionOutput = descriptionTemplates
      .slice()
      .sort(() => Math.random() - 0.5);
    return descriptionOutput
      .slice(1, count + 1)
      .join(` `);
  };

  const photosCount = getRandomNumber(1, 5);
  const generatePhotos = (count) => {
    return new Array(count)
      .fill(``)
      .map(() => {
        return `http://picsum.photos/248/152?r=${Math.random()}`;
      });
  };

  const startTime = getRandomNumber(0, 1440);
  const durationTime = getRandomNumber(10, 12000);
  const endTime = startTime + durationTime;

  const generateStartTime = () => {
    const startHours = castTimeFormat(Math.trunc(startTime / 60) % 24);
    const startMinutes = castTimeFormat(startTime % 60);
    return `${startHours}:${startMinutes}`;
  };

  const generateEndTime = () => {
    const endHours = castTimeFormat(Math.trunc(endTime / 60) % 24);
    const endMinutes = castTimeFormat(endTime % 60);
    return `${endHours}:${endMinutes}`;
  };

  return {
    type: getEventType.name,
    destination: arrPicker(destinations),
    offers: generateOffers(getRandomNumber(0, MAX_OFFER_COUNT + 1), getEventType),
    description: generateDescription(descrSentenceCount),
    photos: generatePhotos(photosCount),
    start: generateStartTime(),
    duration: durationTime,
    end: generateEndTime(),
    price: getRandomNumber(0, 1000),
    isFavorite: Math.random() > 0.5
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

const events = generateEvents(EVENT_COUNT);
const newEventData = events[0];
const tripEvents = events.slice(1);

const generateTrip = (duration) => {
  return new Array(duration)
    .fill(``);
};

const tripPoints = generateTrip(TRIP_DURATION);

let start = 0;
tripPoints.forEach((event, i) => {
  const getRandomEventCount = getRandomNumber(1, MAX_EVENT_PER_DAY + 1);
  const end = start + getRandomEventCount;
  tripPoints[i] = tripEvents.slice(start, end);
  start = end;
});

const visitedCities = new Set();
tripPoints.forEach((eventlist) => {
  eventlist.forEach((event) => {
    visitedCities.add(event.destination);
  });
});
const tripDestinations = Array.from(visitedCities);

export {tripPoints, newEventData, eventTypes, tripDestinations};
