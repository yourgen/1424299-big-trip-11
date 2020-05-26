export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SortingType = {
  DURATION: `duration`,
  PRICE: `price`,
  DEFAULT: `default`,
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

export const EmptyEvent = {
  price: ``,
  start: new Date(),
  end: new Date(),
  destination: {
    description: ``,
    name: ``,
    pictures: []
  },
  id: 0,
  isFavorite: false,
  offers: [],
  type: `flight`
};

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`,
};

export const TRANSFER_TYPES = [`bus`, `train`, `taxi`, `ship`, `transport`, `drive`, `flight`];
export const ACTIVITY_TYPES = [`check-in`, `sightseeing`, `restaurant`];

export const BAR_HEIGHT = 55;

export const ChartTitle = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPENT: `TIME SPENT`,
};
export const chartIconsMap = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛️`,
  'restaurant': `🍴`,
};

export const HIDDEN_CLASS = `visually-hidden`;

export const AUTHORIZATION = `Basic diuy32brbd1iubwdsb1wd=`;
export const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

export const SHAKE_ANIMATION_TIMEOUT = 600;
