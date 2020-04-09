import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../../components/Toggle';

const About = () => (
  <div>
    <p>About Page...</p>
    <Toggle />
    <Link to="/">
      <p>goto prev page</p>
    </Link>
  </div>
);

export default About;
