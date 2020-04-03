import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormItem from './FormItem';

class Form extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);

    let updatedOptions = [];

    for (let i = 0; i < this.props.optionsArray.length; i++) {
      updatedOptions.push(formData.get(i.toString()));
    }

    console.log(updatedOptions);
  };

  handleInputChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    console.log(this.props.optionsArray);
  };

  render() {
    return (
      <>
        <form className="form hide" id="form">
          <p>Study List</p>
          <ul>
            {this.props.optionsArray.map((option, index) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              return (
                <FormItem option={option} name={index.toString()} key={index} />
              );
            })}
          </ul>

          <button className="add-option-button" onClick={this.props.addOption}>
            <FontAwesomeIcon icon={faPlus} />
          </button>

          <button
            onClick={e => this.props.handleSubmit(e)}
            className="submit-button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default Form;
