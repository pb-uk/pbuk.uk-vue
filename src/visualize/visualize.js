const defaults = {};

export class Visualize {
  constructor(el, options) {
    this.settings = { ...defaults, ...options };
    this.el = el;
  }
}
