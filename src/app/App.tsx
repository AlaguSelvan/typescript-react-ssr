import React from 'react';
import Routes from './Router/Routes'
import { BrowserRouter } from 'react-router-dom';

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    )
  }
}