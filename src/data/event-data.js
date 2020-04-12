import {getRandomNumber, arrPicker} from "../utils.js";

const EVENT_COUNT = 20;
const MAX_EVENT_PER_DAY = 4;
const TRIP_DURATION = 5;

const eventTypes = [
  `Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`
];

const destinations = [
  `Amsterdam`, `London`, `Paris`, `Prague`, `Rome`
];

const generateEvent = () => {
  // const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    type: arrPicker(eventTypes),
    destination: arrPicker(destinations),
    pic: `http://picsum.photos/248/152?r=${Math.random()}`,
    duration: null,
    price: `20`,
    offers: null,

  };
};

const generateOffer = () => {
  return {
    type: arrPicker(eventTypes),
    destination: arrPicker(destinations),
    price: `20`,
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

const events = generateEvents(EVENT_COUNT);

const generateTrip = (duration) => {
  return new Array(duration)
    .fill(``);
};

const tripDays = generateTrip(TRIP_DURATION);

let start = 0;
tripDays.forEach((event, i) => {
  const getRandomEventCount = getRandomNumber(1, MAX_EVENT_PER_DAY + 1);
  const end = start + getRandomEventCount;
  tripDays[i] = events.slice(start, end);
  start = end;
});

export {tripDays};
