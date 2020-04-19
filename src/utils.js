export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place = renderPosition.BEFOREEND) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

