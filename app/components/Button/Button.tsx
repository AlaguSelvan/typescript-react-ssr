import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import { css } from 'emotion';

const color = 'white';

interface Props {
  children?:
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
  value?: string;
}
const Button: React.FC<Props> = ({ children, value }) => {
  const [count, setCount] = React.useState(0);
  return (
    <button
      onClick={() => setCount(count + 1)}
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
      <p data-testid="para">{children || value || count}</p>
    </button>
  );
};

export default Button;
