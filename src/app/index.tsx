import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom';
import App from './App'


const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

function render(App: any) {
  renderMethod(
    <HelmetProvider>
      <AppContainer>
        <App />
      </AppContainer>
    </HelmetProvider>,
    document.getElementById('root'),
  );
}
render(App)

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NewAppRoot = require('./App.js').default;
    render(App);
  });
}