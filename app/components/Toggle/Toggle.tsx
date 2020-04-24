import React from 'react';
import { css } from 'emotion';

const color = 'white';

const Toggle = () => {
  // const [count, setCount] = React.useState(0);
  return (
    <input
      type="checkbox"
      name={'this.props.Name'}
      className="toggle-switch-checkbox"
      // id={this.props.id}
      checked={true}
      // defaultChecked={this.props.defaultChecked}
      // onChange={this.onChange}
      // disabled={this.props.disabled}
    />
  );
};

export default Toggle;
