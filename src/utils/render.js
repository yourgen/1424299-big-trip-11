export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const ElementPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, component, place = ElementPosition.BEFOREEND) => {
  switch (place) {
    case ElementPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case ElementPosition.BEFOREBEGIN:
      container.before(component.getElement());
      break;
    case ElementPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistingElements = !!(parentElement && newElement && oldElement);

  if (isExistingElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
