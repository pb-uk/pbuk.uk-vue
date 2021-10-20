import { DynamicPlot } from './dynamic-plot';

const defaults = {};

function setState() {
  const plotArea = [200, 700, 1500, 100];
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
    start: y0,
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
        xAxis: 0,
        yAxis: 1,
        values: [],
      },
    ],
  };
}

export class DynamicPlot2d extends DynamicPlot {
  constructor(el, options) {
    super(el, { ...defaults, ...options });
    this.state = setState();
  }

  plot([x, y]) {
    this.el.innerHTML += `(${x}, ${y}); `;
  }
}
