import { combineReducers } from 'redux';

import app from './app';

const rootReducer = combineReducers({
  app: app,
});

export default rootReducer;
