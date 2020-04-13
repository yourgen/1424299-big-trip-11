import {getRandomNumber, arrPicker, castTimeFormat} from "../utils.js";

const EVENT_COUNT = 20;
const MAX_EVENT_PER_DAY = 4;
const TRIP_DURATION = 5;
const MAX_OFFER_COUNT = 5;

const eventTypes = [
  {name: `Taxi`, offers: [`Order Uber`]},
  {name: `Bus`, offers: [`Switch to comfort`, `Switch to business`]},
  {name: `Train`, offers: [`Switch to comfort`, `Switch to business`]},
  {name: `Ship`, offers: [`Switch to comfort`, `Switch to business`]},
  {name: `Transport`, offers: [`Switch to comfort`, `Switch to business`]},
  {name: `Drive`, offers: [`Rent a car`, `Rent premium-class car`]},
  {name: `Flight`, offers: [`Add luggage`, `Switch to business`, `Choose seats`]},
  {name: `Check-in`, offers: [`Add breakfast`, `Add lunch`, `Transfer to hotel`, `Luggage Forwarding`]},
  {name: `Sightseeing`, offers: [`Book tickets`, `Museum`, `All-day tour guide`]},
  {name: `Restaurant`, offers: [`Try luxury-class`]}
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

  const getEventType = arrPicker(eventTypes);

  const generateOffers = (count, eventType) => {
    return new Array(count)
      .fill(``)
      .map(() => {
        return {
          name: arrPicker(eventType.offers),
          price: getRandomNumber(0, 100)
        };
      });
  };

  const descrSentenceCount = Math.floor(Math.random() * descriptionTemplates.length);
  const generateDescription = (count) => {
    const descriptionOutput = descriptionTemplates
      .slice()
      .sort(() => Math.random() - 0.5);
    return descriptionOutput
      .slice(1, count + 1)
      .join(` `);
  };

  const startTime = getRandomNumber(0, 1440);
  const durationTime = getRandomNumber(10, 120);
  const endTime = startTime + durationTime;

  const generateStartTime = () => {
    const startHours = castTimeFormat(Math.trunc(startTime / 60));
    const startMinutes = castTimeFormat(startTime % 60);
    return `${startHours}:${startMinutes}`;
  };

  const generateDuration = () => {
    const durationHours = castTimeFormat(Math.trunc(durationTime / 60));
    const durationMinutes = castTimeFormat(durationTime % 60);
    return (
      durationHours !== `00` ? `${durationHours}H ${durationMinutes}M` : `${durationMinutes}M`
    );
  };

  const generateEndTime = () => {
    const endHours = castTimeFormat(Math.trunc(endTime / 60));
    const endMinutes = castTimeFormat(endTime % 60);
    return `${endHours}:${endMinutes}`;
  };

  return {
    type: getEventType.name,
    destination: arrPicker(destinations),
    offers: generateOffers(getRandomNumber(0, MAX_OFFER_COUNT + 1), getEventType),
    description: generateDescription(descrSentenceCount),
    pic: `http://picsum.photos/248/152?r=${Math.random()}`,
    start: generateStartTime(),
    duration: generateDuration(),
    end: generateEndTime(),
    price: getRandomNumber(0, 1000)
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
