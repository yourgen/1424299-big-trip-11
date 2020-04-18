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
  if (event.type === `Check-in` || event.type === `Sightseeing` || event.type === `Restaurant`) {
    return `${event.type} in`;
  } else {
    return `${event.type} to`;
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

