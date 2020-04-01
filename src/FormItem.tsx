import React from 'react';

function FormItem(props) {
  return (
    <li>
      <input
        type="text"
        name={props.option}
        placeholder={props.option}
        // onChange={this.props.handleInputChange}
      />
    </li>
  );
}

export default FormItem;
