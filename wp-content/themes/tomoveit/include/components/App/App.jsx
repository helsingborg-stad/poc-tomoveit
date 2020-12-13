import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from '../../store/store';

import Home from '../../pages/Home/Home.jsx';
import Activities from '../../pages/Activities/Activities.jsx';
import Introduction from '../../pages/Introduction/Introduction.jsx';
import Login from '../../pages/Login/Login.jsx';
import Header from '../Header/Header.jsx';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <Header/>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/welcome" component={Home} />
            <Route path="/activities" component={Activities} />
            <Route path="/introduction" component={Introduction} />
          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
