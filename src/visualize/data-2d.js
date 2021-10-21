import { createSvg, setAttributes, setStyles } from './svg';

const defaults = {
  trailPoints: 20,
};

export class Data2d {
  constructor(options) {
    this.settings = { ...defaults, ...options };
    this.parentElement = this.settings.parentElement;
    this.xAxis = this.settings.xAxis;
    this.yAxis = this.settings.yAxis;

    this.currentData = [];
    this.currentIndex = 0;
    this.trailPoints = this.settings.trailPoints;
    this.rgbaString = 'rgba(0,0,0,';
  }

  transformValueCoordinates([x, y]) {
    return [
      (x - this.xAxis.offset) * this.xAxis.scale,
      (y - this.yAxis.offset) * this.yAxis.scale,
    ];
  }

  getColor(alpha = 1) {
    return `${this.rgbaString}${alpha})`;
  }

  plot(coords) {
    if (this.currentData.length < this.trailPoints) {
      // Calculate on-screen coordinates for the plot.
      const [x, y] = this.transformValueCoordinates(coords);
      // Create a new element and plot it on top of the older ones.
      const colorString = this.getColor();
      const el = createSvg('circle', {
        attributes: { cx: x, cy: y, r: 4 },
        styles: { fill: colorString, stroke: colorString },
        parent: this.parentElement,
      });
      this.currentData.push({ el, x, y, coords });
    } else {
      // Update the old elements.
      let i = 0;
      for (; i < this.currentData.length - 1; ++i) {
        const { coords, x, y } = this.currentData[i + 1];
        // Move values from the next array element to the current one.
        this.currentData[i].x = x;
        this.currentData[i].y = y;
        this.currentData[i].coords = coords;
        // Change the coordinates of the current DOM element.
        setAttributes(this.currentData[i].el, { cx: x, cy: y });
        const colorString = this.getColor(0.2);
        setStyles(this.currentData[i].el, {
          fill: colorString,
          stroke: colorString,
        });
      }

      // Calculate on-screen coordinates for the plot.
      const [x, y] = this.transformValueCoordinates(coords);
      // Change the coordinates of the top DOM element.
      this.currentData[i].x = x;
      this.currentData[i].y = y;
      this.currentData[i].coords = coords;
      setAttributes(this.currentData[i].el, { cx: x, cy: y });
    }
  }
}
