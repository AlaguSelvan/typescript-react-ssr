import React from 'react'
import { css } from 'emotion'

const color = 'white'

const Toggle = () => {
  // const [count, setCount] = React.useState(0);
  return (
    <div
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
      Hover to change color.
    </div>
  )
}

export default Toggle
