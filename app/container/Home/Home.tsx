import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Home = () => (
  <div>
    <p>Home Page...</p>
    <Button>Hover</Button>
    <Link to="/about">
      <p>Go To About Page</p>
      {/* <p>😭 Old State</p> */}
    </Link>
  </div>
);

export default Home;
