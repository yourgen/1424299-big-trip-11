export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

export const EmptyEvent = {
  price: ``,
  start: new Date().toISOString(),
  end: new Date().toISOString(),
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
