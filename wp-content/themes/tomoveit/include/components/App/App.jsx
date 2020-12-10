import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';

import Home from '../../pages/Home/Home.jsx';
import Login from '../../pages/Login/Login.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
