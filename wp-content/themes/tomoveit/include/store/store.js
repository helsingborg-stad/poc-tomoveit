import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import app from '../reducers/app';

const store = createStore(app, composeWithDevTools());

export default store;
