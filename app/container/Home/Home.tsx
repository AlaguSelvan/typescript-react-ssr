import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const About = () => (
  <div>
    <p>Home Page...</p>
    {/* <Button /> */}
    <Link to="/about">
      <p>🔥 New State</p>
      {/* <p>😭 Old State</p> */}
    </Link>
  </div>
);

export default About;
