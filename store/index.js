import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import profilecreation from './profilecreation';

const reducer = combineReducers({
  profilecreation,
});


const store = configureStore({
  reducer,
});


export default store;