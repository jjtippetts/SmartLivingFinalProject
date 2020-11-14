import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import RootReducer from './reducers/RootReducer';

const middlewareEnhancers = applyMiddleware(thunkMiddleware);

const store = configureStore({
  reducer: RootReducer
}, undefined, middlewareEnhancers);

export default store;
