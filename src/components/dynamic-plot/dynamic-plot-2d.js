import { DynamicPlot } from './dynamic-plot';

const defaults = {};

const ns = 'http://www.w3.org/2000/svg';

function createSvg(name = 'svg', parent) {
  const el = document.createElementNS(ns, name);
  if (parent) {
    parent.appendChild(el);
  }
  return el;
}

function setState() {
  const plotArea = [200, 100, 1500, 700];
  const [x0, y0, x1, y1] = plotArea;
  const xAxis = {
    min: -10,
    max: 10,
    length: x1 - x0,
    start: x0,
  };
  const yAxis = {
    min: -1,
    max: 1,
    length: y0 - y1,
    start: y1,
  };
  const axes = [xAxis, yAxis];
  axes.forEach((axis) => {
    axis.scale = axis.length / (axis.max - axis.min);
    axis.offset = axis.min - axis.start / axis.scale;
  });
  return {
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

export class DynamicPlot2d extends DynamicPlot {
  constructor(el, options) {
    super(el, { ...defaults, ...options });
    this.state = setState();

    this.svgEl = createSvg('svg', el);
    this.svgEl.setAttributeNS(ns, 'viewBox', '0 0 900 1600');
    console.log('Width of parent element', el.style.width, el);
    el.style.height = `${(el.clientWidth * 9) / 16}px`;
    this.svgEl.style.width = '100%';
    this.svgEl.style.height = '100%';
    this.plotEl = createSvg('svg', this.svgEl);
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
    console.log(this.plotEl);
    this.plotEl.innerHTML += `<circle cx="${x}" cy="${y}" r="25"/>`;
  }
}
