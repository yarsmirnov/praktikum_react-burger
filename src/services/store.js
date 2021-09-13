import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import { socketMiddleware } from './moddlewares/socketMiddleware';


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, socketMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;
