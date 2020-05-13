import {FilterType} from "../data/const";

export const getPastEvents = (events, date) => {
  if (Array.isArray(events)) {
    const result = events.map((eventlist) => {
      return eventlist.filter((event) => event.end < date);
    });
    return result;
  }

  const result = events.filter((event) => {
    return event.end < date;
  });
  return result;
};

export const getFutureEvents = (events, date) => {
  if (Array.isArray(events)) {
    const result = events.map((eventlist) => {
      return eventlist.filter((event) => event.start >= date);
    });
    return result;
  }

  const result = events.filter((event) => {
    return event.start >= date;
  });
  return result;
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
