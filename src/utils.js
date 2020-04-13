export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const arrPicker = (arr) => {
  return arr[getRandomNumber(0, arr.length)];
};
