import React from 'react';

import {
  drawWheel,
  drawPicker,
  drawOptions,
  spinWheel,
} from './canvasFunctions';

class Canvas extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      canvasRef: React.createRef(),
    };
  }

  componentDidMount(
    { options, colors } = this.props,
    { canvasRef } = this.state,
  ) {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth - 100;
    this.draw(options, colors);

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate({ options, colors } = this.props) {
    this.draw(options, colors);
  }

  handleKeyDown = (event, { options, colors } = this.props) => {
    switch (event.keyCode) {
      case 32: // space key
        this.initialWheelSpin(options, colors);
        break;
      default:
        break;
    }
  };

  //  redraw the wheel, options, and picker
  draw = (options, colors, { canvasRef } = this.state): void => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWheel(ctx);
      drawPicker(canvas, ctx);
      drawOptions(canvas, ctx, Object.values(options), colors);
    }
  };

  //  redraws the wheel to make it appear to spin a minimum of 3+ seconds
  initialWheelSpin = (options, colors) => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // was getting error line, cannot convert null or undefined to obj, hence if
    if (this && options) {
      spinWheel(canvas, ctx, Object.values(options), colors);
    }
  };

  render({ canvasRef } = this.state, { options, colors } = this.props) {
    return (
      <div>
        <canvas
          ref={canvasRef}
          onClick={() => this.initialWheelSpin(options, colors)}
        />
      </div>
    );
  }
}

export default Canvas;
