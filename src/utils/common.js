import moment from "moment";
import 'moment-duration-format';

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

export const getTimeDifference = (event, output) => {
  const eventStart = moment(event.start);
  const eventEnd = moment(event.end);

  return eventEnd.diff(eventStart, output);
};

export const formatEventDuration = (event) => {
  const duration = moment.duration(getTimeDifference(event, `milliseconds`));

  return duration.format(`DD[D] HH[H] mm[M]`);
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sortEventsByDate = (events) => {
  return events
    .slice()
    .sort((a, b) => a.start - b.start);
};

export const getEventTitle = (event) => {
  switch (event.type) {
    case `check-in`:
    case `sightseeing`:
    case `restaurant`:
      return `${capitalize(event.type)} in`;
    case `bus`:
    case `train`:
    case `taxi`:
    case `ship`:
    case `transport`:
    case `drive`:
    case `flight`:
      return `${capitalize(event.type)} to`;
    default:
      return ``;
  }
};
