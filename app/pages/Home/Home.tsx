import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

const Home = () => (
  <div>
    <p>
    Hello World...
    </p>
    <Link to="/about">
    <Button />
      </Link>
  </div>
)


export default Home