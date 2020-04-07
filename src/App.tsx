import React from 'react';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Collapse from './Collapse';
import Title from './Title';
import Form from './Form';

import './styles.css';

import {
  drawWheel,
  drawPicker,
  drawOptions,
  spinWheel,
} from './canvasFunctions';

// see this link: https://stackoverflow.com/questions/50630955/react-linter-warning-unused-state-field-while-the-state-field-is-being-used
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: ['HTML/CSS', 'Vanilla JS', 'React', 'Node', 'Hackerrank'],
      colors: ['#3FB8AF', '#7FC7AF', '#DAD8A7', '#FF9E9D', '#FF3D7F'],
      colorOptions: [''],
    };
    this.updateAppOptions = this.updateAppOptions.bind(this);
  }

  //  set up space bar event handler and color pallete
  componentDidMount({ options, colors } = this.state) {
    document.addEventListener('keydown', this.handleKeyDown);

    //  color pallette from here https://codepen.io/dropside/pen/KkLaH
    const colorArray = [];
    let newColor = '';

    for (let i = 0; i < options.length; i++) {
      newColor = colors[Math.floor(Math.random() * colors.length)];
      colorArray.push(newColor);
    }

    this.setState(() => ({ colorOptions: colorArray }));
  }

  //  if options are updated, redraw the canvas
  componentDidUpdate() {
    this.draw();
  }

  //  add a new option on to state and wheel
  addOption = (e: any) => {
    e.preventDefault();
    this.setState(() => ({
      options: [...this.state.options, 'take a break'],
    }));

    setTimeout(this.draw, 100);
  };

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 32: // space key
        this.spinWheel();
        break;
      default:
        break;
    }
  };

  //  redraw the wheel, options, and picker
  draw = ({ options, colorsOptions } = this.state): void => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    drawWheel(ctx);
    drawPicker(canvas, ctx);
    drawOptions(canvas, ctx, Object.values(options), colorsOptions);
  };

  //  Update options with new value
  updateAppOptions = (optionName: string, optionValue: string): void => {
    const { options } = this.state;
    options[optionName] = optionValue;
    this.setState(() => ({ options }));
    this.draw();
  };

  //  redraws the wheel to make it appear to spin a minimum of 3+ seconds
  spinWheel = ({ options, colors } = this.state): void => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // was getting error line, cannot convert null or undefined to obj, hence if
    if (this && options) {
      spinWheel(canvas, ctx, Object.values(options), colors);
    }
  };

  //  handle submission of form component to update options
  handleFormSubmit = (e: any, { options } = this.state): void => {
    e.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const updatedOptions = [];

    for (let i = 0; i < options.length; i++) {
      updatedOptions.push(formData.get(i.toString()));
    }

    this.setState(() => ({ options: updatedOptions }));
    this.draw();
  };

  render({ options } = this.state) {
    return (
      <>
        <Title title="Study Wheel" />
        <div className="options-menu">
          <Collapse>
            <FontAwesomeIcon icon={faBars} />
          </Collapse>
          <Form
            updateApp={this.updateAppOptions}
            optionsArray={options}
            addOption={this.addOption}
            handleSubmit={this.handleFormSubmit}
          />
        </div>
        <div className="canvas-holder">
          <canvas className="canvas" />
        </div>
      </>
    );
  }
}

export default App;
