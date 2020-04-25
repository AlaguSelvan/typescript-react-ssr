import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch, Button } from '../../components';

const About = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <p>About Page...</p>
      <p>Custom CheckBox Toggle with Emotion</p>
      <Switch checked={checked} onChange={() => setChecked(!checked)} />
      <p>Custom Button with Emotion</p>
      <Button />
      <Link to="/">
        <p>goto 👈 prev page</p>
      </Link>
    </div>
  );
};

export default About;
