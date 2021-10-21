const ns = 'http://www.w3.org/2000/svg';

export const createSvg = (
  name = 'svg',
  { attributes, parent, styles } = {}
) => {
  const el = document.createElementNS(ns, name);
  if (attributes) {
    setAttributes(el, attributes);
  }

  if (styles) {
    setStyles(el, styles);
  }

  if (parent) {
    parent.appendChild(el);
  }
  return el;
};

export const setAttributes = (el, attributes) => {
  Object.entries(attributes).forEach(([name, value]) => {
    el.setAttribute(name, value);
  });
};

export const setStyles = (el, styles) => {
  Object.entries(styles).forEach(([name, value]) => {
    el.style[name] = value;
  });
};
