import {FilterType} from "../data/const";
import moment from "moment";


export const getPastEvents = (events, date) => {
  console.log(events);
  if (Array.isArray(events)) {
    events.map((eventlist) => {
      eventlist.filter((event) => {
        return date.diff(event.end) > 0;
      });
    });
    console.log(events);
    return events;
  }

  events.filter((event) => event.end < date);
  console.log(events);
  return events;
};

export const getFutureEvents = (events, date) => {
  console.log(events);
  if (Array.isArray(events)) {
    events.map((eventlist) => eventlist.filter((event) => event.start >= date));
    console.log(events);
    return events;
  }

  events.filter((event) => event.start >= date);
  console.log(events);
  return events;
};

export const getEventsByFilter = (events, filterType) => {
  const nowDate = moment();

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
