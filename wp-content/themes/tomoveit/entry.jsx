import 'babel-polyfill';
import React from 'react';
import RenderDOM from 'react-dom';

const root = document.getElementById('root');

const App = require('./include/components/App/App.jsx').default;

const renderApp = () => { RenderDOM.render(<App />, root); };

if (module.hot) {
  module.hot.accept();
}

renderApp();
