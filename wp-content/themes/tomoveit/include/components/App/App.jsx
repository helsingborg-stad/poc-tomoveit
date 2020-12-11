import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store/store';

import Home from '../../pages/Home/Home.jsx';
import Login from '../../pages/Login/Login.jsx';
import Header from '../Header/Header.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Header/>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/welcome" component={Home} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
