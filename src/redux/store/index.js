import { applyMiddleware, compose, createStore } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const promise = createPromise({ types: { fulfilled: 'success' } });
const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware, promise)));

export default store;
