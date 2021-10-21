import { createSvg, setAttributes } from './svg';
import { Visualize } from './visualize';
import { Axis2d } from './axis-2d';
import { Data2d } from './data-2d';

const aspectRatios = {
  '1:1': [900, 900],
  '16:9': [1600, 900],
  '4:3': [1200, 900],
};

const defaults = {
  aspectRatio: '16:9',
  data: [{}],
};

export class Visualize2d extends Visualize {
  constructor(el, options) {
    super(el, { ...defaults, ...options });
    this.svgEl = createSvg('svg', {
      parent: el,
    });

    this.plotEl = createSvg('g', {
      parent: this.svgEl,
      styles: { fill: '#777', stroke: '#777' },
    });

    this.state = {};
    this.setState();
  }

  setState() {
    const settings = this.settings;

    this.state.dimensions = aspectRatios[settings.aspectRatio];

    const [width, height] = this.state.dimensions;

    setAttributes(this.svgEl, { viewBox: `0 0 ${width} ${height}` });

    // top, right, bottom, left.
    const plotMargins = [4, 4, 4, 4];

    const [mt, mr, mb, ml] = plotMargins;
    this.state.plotArea = [ml, mt, width - mr, height - mb];

    const [x0, y0, x1, y1] = this.state.plotArea;

    // Set up the axes.
    this.axes = settings.axes.map((axis, i) => {
      // Assume first axis is the x-axis, others are y-axes.
      axis.isX = axis.isX == null ? i === 0 : axis.isX === true;
      if (axis.isX) {
        axis.length = x1 - x0;
        axis.start = x0;
      } else {
        axis.length = y0 - y1;
        axis.start = y1;
      }
      return new Axis2d(axis);
    });

    const [xAxis, yAxis] = this.axes;

    this.data = this.settings.data.map((data) => {
      return new Data2d({ ...data, parentElement: this.plotEl, xAxis, yAxis });
    });
  }

  plot(coords, dataId = 0) {
    this.data[dataId].plot(coords);
  }
}
