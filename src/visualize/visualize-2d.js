import { Visualize } from './visualize';
import { Axis2d } from './axis-2d';

const aspectRatios = {
  '1:1': [900, 900],
  '16:9': [1600, 900],
  '4:3': [1200, 900],
};

const defaults = {
  aspectRatio: '16:9',
};

const ns = 'http://www.w3.org/2000/svg';

function createSvg(name = 'svg', { attributes, parent } = {}) {
  const el = document.createElementNS(ns, name);
  if (attributes) {
    setAttributes(el, attributes);
  }

  if (parent) {
    parent.appendChild(el);
  }
  return el;
}

function setAttributes(el, attributes) {
  Object.entries(attributes).forEach(([name, value]) => {
    el.setAttribute(name, value);
  });
}

export class Visualize2d extends Visualize {
  constructor(el, options) {
    super(el, { ...defaults, ...options });
    this.svgEl = createSvg('svg', {
      parent: el,
    });

    this.plotEl = createSvg('g', {
      parent: this.svgEl,
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
    const plotArea = [ml, mt, width - mr, height - mb];

    const [x0, y0, x1, y1] = plotArea;
    // Set up the axes.
    const axes = settings.axes.map((axis, i) => {
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
    console.log(axes);
    this.state = {
      ...this.state,
      plotArea,
      axes,
      data: [
        {
          axes: [...axes],
          values: [],
        },
      ],
    };
  }

  transformValueCoordinates([x, y], [xAxis, yAxis]) {
    return [(x - xAxis.offset) * xAxis.scale, (y - yAxis.offset) * yAxis.scale];
  }

  plot(coords) {
    // this.data[0];
    const [x, y] = this.transformValueCoordinates(
      coords,
      this.state.data[0].axes
    );
    createSvg('circle', {
      attributes: { cx: x, cy: y, r: 2 },
      parent: this.plotEl,
    });
  }
}
