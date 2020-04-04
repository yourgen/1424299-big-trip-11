const tripPointTemplate = (day) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-${17 + day}">MAR ${17 + day}</time>
      </div>

      <ul class="trip-events__list">
        
      </ul>
    </li>`
  );
};

export {tripPointTemplate};
