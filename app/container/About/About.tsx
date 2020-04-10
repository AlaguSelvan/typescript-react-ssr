import React from 'react';
import { Link } from 'react-router-dom';
import { Toggle } from '../../components';

const About = () => (
  <div>
    <p>About Page...</p>
    <Toggle />
    <Link to="/">
      <p>Go to Home</p>
    </Link>
  </div>
);

export default About;
