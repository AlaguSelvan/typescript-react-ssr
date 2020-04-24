import React from 'react';
import { Link } from 'react-router-dom';
import { Toggle, Button } from '../../components';

const About = () => (
  <div>
    <p>About Page...</p>
    <Toggle />
    <Link to="/">
      <p>goto 👈 prev page</p>
    </Link>
  </div>
);

export default About;
