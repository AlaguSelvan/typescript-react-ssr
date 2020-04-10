import React from 'react';
import { css } from 'emotion';

const color = 'white';

const Button = (props: any) => {
  const [count, setCount] = React.useState(0);
  return (
    <button
      onClick={() => setCount(count + 2)}
      className={css`
        padding: 32px;
        background-color: red;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}
    >
      {props.children} {count} times
    </button>
  );
};

export default Button;
