import {isOneDay} from "./common";
import {FilterType} from "../data/const";

export const getPastEvents = (events, date) => {
  if (Array.isArray(events)) {
    return events.forEach((eventlist) => eventlist.filter((event) => {
      return event.end < date && !isOneDay(date, event.end);
    }));
  }

  return events.filter((event) => {
    return event.end < date && !isOneDay(date, event.end);
  });
};

export const getFutureEvents = (events, date) => {
  if (Array.isArray(events)) {
    return events.forEach((eventlist) => eventlist.filter((event) => {
      return event.start >= date;
    }));
  }

  return events.filter((event) => {
    return event.start >= date;
  });
};

export const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.PAST:
      return getPastEvents(events, nowDate);
    case FilterType.FUTURE:
      return getFutureEvents(events, nowDate);
  }

  return events;
};
