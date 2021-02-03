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
import SingleActivity from '../../pages/SingleActivity/SingleActivity.jsx';
import CurrentActivity from '../../pages/CurrentActivity/CurrentActivity.jsx';
import Statistics from '../../pages/Statistics/Statistics.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import CompanyActivities from '../../pages/CompanyActivities/CompanyActivities.jsx';
import SingleCompanyActivity from '../../pages/SingleCompanyActivity/SingleCompanyActivity.jsx';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <HashRouter>
          <Header/>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/welcome" component={Home} />
            <PrivateRoute path="/activities" component={Activities} />
            <PrivateRoute path="/introduction" component={Introduction} />
            <PrivateRoute path="/activity" component={SingleActivity} />
            <PrivateRoute path="/runningActivity" component={CurrentActivity} />
            <PrivateRoute path="/statistics" component={Statistics} />
            <PrivateRoute path="/föreningar" component={CompanyActivities} />
            <PrivateRoute path="/aktivitet" component={SingleCompanyActivity} />
          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
