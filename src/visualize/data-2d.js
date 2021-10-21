const defaults = {};

export class Data2d {
  constructor(options) {
    this.settings = { ...defaults, ...options };
  }
}
