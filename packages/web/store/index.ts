import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
