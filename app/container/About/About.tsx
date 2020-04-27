import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '../../components';

const About = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <p>About Page...</p>
      <p>Custom CheckBox Toggle with Styled Components</p>
      <Switch checked={checked} onChange={() => setChecked(!checked)} />
      <Link to="/">
        <p>goto 👈 prev page</p>
      </Link>
    </div>
  );
};

export default About;
