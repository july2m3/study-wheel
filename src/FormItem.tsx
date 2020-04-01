import React from 'react';

function FormItem(props: any) {
  return (
    <li>
      <input
        type="text"
        placeholder={this.props.option}
        onChange={this.props.handleInputChange}
      />
    </li>
  );
}

export default FormItem;
