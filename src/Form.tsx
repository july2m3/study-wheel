import React from 'react';

class Form extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    for (let option in this.state) {
      this.props.updateApp(option, this.state[option]);
    }
  };

  handleInputChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className="form" id="form">
        <p>Study List</p>
        <ul>
          <li>
            <label>Option 1</label>
            <input
              type="text"
              name="option1"
              placeholder={this.props.optionsArray.option1}
              onChange={this.handleInputChange}
            />
          </li>
          <li>
            <label>Option 2</label>
            <input
              type="text"
              name="option2"
              placeholder={this.props.optionsArray.option2}
              onChange={this.handleInputChange}
            />
          </li>
          <li>
            <label>Option 3</label>
            <input
              type="text"
              name="option3"
              placeholder={this.props.optionsArray.option3}
              onChange={this.handleInputChange}
            />
          </li>
          <li>
            <label>Option 4</label>
            <input
              type="text"
              name="option4"
              placeholder={this.props.optionsArray.option4}
              onChange={this.handleInputChange}
            />
          </li>
        </ul>
        <button
          onClick={e => this.handleSubmit(e)}
          className="submit-button"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
