import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './services/store';

import App from './components/app/app';

import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
