import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import { socketMiddleware } from './moddlewares/socketMiddleware';

import { wsAllOrdersApi } from './api';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, socketMiddleware(wsAllOrdersApi)],
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;
