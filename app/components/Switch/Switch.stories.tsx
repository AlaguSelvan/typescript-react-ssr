import React from 'react';
import Switch from './Switch';

export default {
  component: Switch,
  title: 'Toggle'
};

export const Base = () => {
  const [checked, setChecked] = React.useState(true);

  // https://github.com/WordPress/gutenberg/pull/18031
  // useEffect(() => {
  // updateTitle(document.title);
  // }, []);

  return (
    <>
      <Switch checked={checked} onChange={() => setChecked(!checked)} />
    </>
  );
};
