import React from 'react';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Collapse from './Collapse';
import Title from './Title';
import Form from './Form';
import Canvas from './Canvas';

import './styles.css';

// see this link: https://stackoverflow.com/questions/50630955/react-linter-warning-unused-state-field-while-the-state-field-is-being-used
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: ['Website Layouts', 'Babel', 'WebPack', 'Redux', 'Testing'],
      colors: ['#3FB8AF', '#7FC7AF', '#DAD8A7', '#FF9E9D', '#FF3D7F'],
    };
    this.updateAppOptions = this.updateAppOptions.bind(this);
  }

  //  set up and color pallete
  componentDidMount({ options, colors } = this.state) {
    //  color pallette from here https://codepen.io/dropside/pen/KkLaH
    const colorArray = [];
    let newColor = '';

    for (let i = 0; i < options.length; i++) {
      newColor = colors[Math.floor(Math.random() * colors.length)];
      colorArray.push(newColor);
    }

    this.setState(() => ({ colors: colorArray }));
  }

  //  add a new option on to state and wheel
  addOption = (e: any) => {
    e.preventDefault();
    this.setState((previousState) => ({
      options: [...previousState.options, 'take a break'],
    }));
  };

  //  Update options with new value
  updateAppOptions = (optionName: string, optionValue: string): void => {
    const { options } = this.state;
    options[optionName] = optionValue;
    this.setState(() => ({ options }));
  };

  //  handle submission of form component to update options
  handleFormSubmit = (e: any, { options } = this.state): void => {
    e.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const updatedOptions = [];

    for (let i = 0; i < options.length; i += 1) {
      updatedOptions.push(formData.get(i.toString()));
    }

    this.setState(() => ({ options: updatedOptions }));
    // this.draw();:
  };

  render({ options, colors } = this.state) {
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
        <Canvas options={options} colors={colors} />
      </>
    );
  }
}

export default App;
