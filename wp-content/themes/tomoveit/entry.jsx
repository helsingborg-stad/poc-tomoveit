import 'babel-polyfill';
import React from 'react';
import RenderDOM from 'react-dom';

import App from './include/components/App/App.jsx';

import './include/scss/reset.scss';
import './include/scss/general.scss';

const root = document.getElementById('root');

const renderApp = () => { RenderDOM.render(<App />, root); };

if (module.hot) {
  module.hot.accept();
}

renderApp();
