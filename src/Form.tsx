import React from 'react';

// function Form() {
class Form extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      option1: 'one',
      option2: '2',
      option3: 'three',
      option4: 'four',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {}

  handleSubmit = (e: any) => {
    e.preventDefault();
    let options = {};
    // this.state.forEach((option: string) => {
    for (let option in this.state) {
      //   console.log(`Option ${option} is ${this.state[option]}`);
      // console.log(this.state[option]);
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
      <form className="form hide" id="form">
        <p>Study List</p>
        <ul>
          <li>
            <label>Option 1</label>
            <input
              type="text"
              name="option1"
              value={this.state.option1}
              onChange={this.handleInputChange}
            />
          </li>
          <li>
            <label>Option 2</label>
            <input
              type="text"
              name="option2"
              value={this.state.option2}
              onChange={this.handleInputChange}
            />
          </li>
          <li>
            <label>Option 3</label>
            <input
              type="text"
              name="option3"
              value={this.state.option3}
              onChange={this.handleInputChange}
            />
          </li>
          <li>
            <label>Option 4</label>
            <input
              type="text"
              name="option4"
              value={this.state.option4}
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
