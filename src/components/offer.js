const createOffer = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

export {createOffer};
