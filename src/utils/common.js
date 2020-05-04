import moment from "moment";

export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const castDurationFormat = (durationTime) => {
  const durationMinutes = castTimeFormat(durationTime % 60);
  const durationHours = castTimeFormat(Math.trunc(durationTime / 60) % 24);
  const durationDays = castTimeFormat(Math.trunc(durationTime / 1440));
  if (durationTime > 1440) {
    return `${durationDays}D ${durationHours}H ${durationMinutes}M`;
  } else if (durationTime > 60) {
    return `${durationHours}H ${durationMinutes}M`;
  } else {
    return `${durationMinutes}M`;
  }
};

export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const arrPicker = (arr) => {
  return arr[getRandomNumber(0, arr.length)];
};

export const getEventTitle = (event) => {
  switch (event.type) {
    case `Check-in`:
    case `Sightseeing`:
    case `Restaurant`:
      return `${event.type} in`;
    case `Bus`:
    case `Train`:
    case `Taxi`:
    case `Ship`:
    case `Transport`:
    case `Drive`:
    case `Flight`:
      return `${event.type} to`;
    default:
      return ``;
  }
};
