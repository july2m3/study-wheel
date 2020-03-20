import React from 'react';

import Collapse from './Collapse';
import Title from './Title';
import Form from './Form';

// import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

import {
  drawWheel,
  drawPicker,
  drawOptions,
  spinWheel,
} from './canvasFunctions';

// function App() {
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: ['React', 'Javascript', 'CSS', 'Personal Project'],
      c: HTMLCanvasElement,
    };
    this.updateAppOptions = this.updateAppOptions.bind(this);
  }

  componentDidMount() {
    // this.state.canvas = document.querySelector('.canvas');
    // this.state.ctx = this.state.canvas.getContext('2d');
    // this.state.canvas.width = window.innerWidth - 100;
    // this.state.canvas.height = window.innerHeight - 100;

    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    drawWheel(ctx);
    drawPicker(this.state.c, ctx);
    // drawPicker(canvas, ctx);
    drawOptions(canvas, ctx, this.state.options);
  }

  updateAppOptions(optionName, optionValue) {
    this.setState({ [optionName]: optionValue });
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
            options={this.state.options}
            updateApp={this.updateAppOptions}
          />
        </div>
        <div
          className="canvas-holder"
          onClick={() => {
            let canvas = document.querySelector('canvas');
            let ctx = canvas.getContext('2d');
            spinWheel(canvas, ctx, this.state.options);
          }}
        >
          <canvas className="canvas" />
        </div>
      </>
    );
  }
}

export default App;
