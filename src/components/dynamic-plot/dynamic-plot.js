const defaults = {};

export class DynamicPlot {
  constructor(el, options) {
    this.settings = { ...defaults, ...options };
    this.el = el;
  }
}
