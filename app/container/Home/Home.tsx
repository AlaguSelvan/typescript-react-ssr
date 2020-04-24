import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Home = () => (
  <div>
    <p>Home Page...</p>
    <Button value={'Hello World'} />
    <Link to="/about">
      <p>goto next 👉 page</p>
    </Link>
  </div>
);

export default Home;
