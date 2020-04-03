import React from 'react';

function FormItem(props) {
  return (
    <li>
      <input
        type="text"
        name={props.name}
        placeholder={props.option}
        // onChange={this.props.handleInputChange}
      />
    </li>
  );
}

export default FormItem;
