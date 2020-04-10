import React from 'react'
import { css, cx } from 'emotion'

const color = 'white';

const Button = () => {
  const [count, setCount] = React.useState(0)
  return (
    <button
      className={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}
    >
      Hover to change color.
    </button>
  );
}

export default Button