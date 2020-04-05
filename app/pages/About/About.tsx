import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const About = () => (
  <div>
    <p>About Page...</p>
    <Link to="/">
      <p>goto prev page</p>
    </Link>
  </div>
);

export default About;
