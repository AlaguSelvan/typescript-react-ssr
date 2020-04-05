import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <p>
    Hello World...
    </p>
    <Link to="/about">
    <p>goto Next page</p>
      </Link>
  </div>
)


export default Home