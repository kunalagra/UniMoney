import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import profilecreation from './profilecreation';
import transactiondata from './transactiondata';

const reducer = combineReducers({
  profilecreation,
  transactiondata,
});


const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});


export default store;