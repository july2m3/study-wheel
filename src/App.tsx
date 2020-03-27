import React from 'react';

import Collapse from './Collapse';
import Title from './Title';
import Form from './Form';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

import {
  drawWheel,
  drawPicker,
  drawOptions,
  spinWheel,
} from './canvasFunctions';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: {
        option1: 'React Practice',
        option2: 'JS Practice',
        option3: 'CSS Practice',
        option4: 'Personal Project',
      },
      c: HTMLCanvasElement,
      test: '',
    };
    this.updateAppOptions = this.updateAppOptions.bind(this);
  }

  componentDidMount() {
    this.draw();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 32: //space key
        this.spinWheel();
        console.log('spinning wheel');
        break;
      default:
        break;
    }
  };

  draw() {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    drawWheel(ctx);
    drawPicker(canvas, ctx);
    drawOptions(canvas, ctx, Object.values(this.state.options));
  }

  updateAppOptions(optionName: string, optionValue: string) {
    let data = this.state.options;
    data[optionName] = optionValue;

    this.setState(() => ({ options: data }));
    this.draw();
  }

  spinWheel() {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    if (this) {
      spinWheel(canvas, ctx, Object.values(this.state.options));
    }
  }

  render() {
    return (
      <>
        <Title title="Study Wheel" />
        <div className="options-menu">
          <Collapse>
            <FontAwesomeIcon icon={faBars} />
          </Collapse>
          <Form
            updateApp={this.updateAppOptions}
            optionsArray={this.state.options}
          />
        </div>
        <div className="canvas-holder" onClick={this.spinWheel}>
          <canvas className="canvas" />
        </div>
      </>
    );
  }
}

export default App;
