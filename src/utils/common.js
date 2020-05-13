import moment from "moment";

export const formatEventTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatEventDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DD[T]HH:mm`);
};

export const formatEditEventDateTime = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export const formatTripDayDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const formatRouteInfoDate = (date) => {
  return moment(date).format(`D MMM`);
};

export const formatTripDayDate = (date) => {
  return moment(date).format(`MMM D`);
};

export const formatEventDuration = (start, end) => {
  const eventStart = moment(start);
  const eventEnd = moment(end);

  const duration = moment.duration(eventEnd.diff(eventStart)).as(`milliseconds`);
  if (duration > 86400000) {
    return moment(duration).format(`DD[D] HH[H] mm[M]`);
  } else if (duration > 3600000) {
    return moment(duration).format(`HH[H] mm[M]`);
  }
  return moment(duration).format(`mm[M]`);
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
