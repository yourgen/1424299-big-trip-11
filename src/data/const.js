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
