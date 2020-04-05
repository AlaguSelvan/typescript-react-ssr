import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button'

const About = () => (
  <div>
    <p>About Page...</p>
    <Button/>
    <Link to="/">
      <p>goto prev page</p>
    </Link>
  </div>
);

export default About;
