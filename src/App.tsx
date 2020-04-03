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
      options: ['HTML/CSS', 'Vanilla JS', 'React', 'Node', 'Hackerrank'],
      colors: ['#3FB8AF', '#7FC7AF', '#DAD8A7', '#FF9E9D', '#FF3D7F'],
      colorOptions: [],
      test: '',
    };
    this.updateAppOptions = this.updateAppOptions.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

    //color pallette from here https://codepen.io/dropside/pen/KkLaH
    let colorArray = [];
    let newColor = '';

    for (let i = 0; i < this.state.options.length; i++) {
      newColor = this.state.colors[
        Math.floor(Math.random() * this.state.colors.length)
      ];
      colorArray.push(newColor);
    }

    this.setState(() => ({ colorOptions: colorArray }));
  }

  //if options are updated, redraw the canvas
  componentDidUpdate() {
    this.draw();
  }

  //add a new option on to state and wheel
  addOption = (e: any) => {
    e.preventDefault();
    this.setState(() => ({
      options: [...this.state.options, 'take a break'],
    }));

    setTimeout(this.draw, 100);
  };

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

  //redraw the wheel, options, and picker
  draw = () => {
    console.log('redrawing');
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    drawWheel(ctx);
    drawPicker(canvas, ctx);
    drawOptions(
      canvas,
      ctx,
      Object.values(this.state.options),
      this.state.colors,
    );
  };

  updateAppOptions = (optionName: string, optionValue: string) => {
    let data = this.state.options;
    data[optionName] = optionValue;

    this.setState(() => ({ options: data }));
    this.draw();
  };

  //redraws the wheel to make it appear to spin a minimum of 3+ seconds
  spinWheel = () => {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    if (this) {
      spinWheel(
        canvas,
        ctx,
        Object.values(this.state.options),
        this.state.colors,
      );
    }
  };

  //handle submission of form component to update options
  handleFormSubmit = (e: any) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);

    let updatedOptions = [];

    for (let i = 0; i < this.state.options.length; i++) {
      updatedOptions.push(formData.get(i.toString()));
    }

    this.setState(() => ({ options: updatedOptions }));
    this.draw();
  };

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
            addOption={this.addOption}
            handleSubmit={this.handleFormSubmit}
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
