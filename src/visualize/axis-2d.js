const defaults = {};

export class Axis2d {
  constructor(options) {
    this.settings = { ...defaults, ...options };
    const [min, max] = this.settings.range;
    this.state = { min, max };
    const { length, start } = this.settings;
    this.state = { ...this.state, length, start };
    this.rescale();
  }

  set max(max) {
    this.state.max = max;
    this.rescale();
  }

  set min(min) {
    this.state.min = min;
    this.rescale();
  }

  set start(start) {
    this.state.start = start;
    this.rescale();
  }

  set length(length) {
    this.state.length = length;
    this.rescale();
  }

  /**
   * Rescale axes.
   *
   * Extended discription goes here.
   *
   */
  rescale() {
    const { max, min, length, start } = this.state;
    this.scale = length / (max - min);
    this.offset = min - start / this.scale;
  }

  transformValue(value) {
    return [(value - this.offset) * this.scale];
  }
}
