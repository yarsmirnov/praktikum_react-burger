import { combineReducers } from 'redux';

import burgerConstructor from './burger-constructor';
import formForgotPassword from './form-forgot-password';
import formLogin from './form-login';
import formProfile from './form-profile';
import formRegister from './form-register';
import formResetPassword from './form-reset-password';
import ingredients from './ingredients';
import modal from '../slices/modal';
import order from '../slices/order';
import user from '../slices/user';
import websocket from '../slices/websocket';


const rootReducer = combineReducers({
  burgerConstructor,
  formForgotPassword,
  formLogin,
  formProfile,
  formRegister,
  formResetPassword,
  ingredients,
  modal,
  order,
  user,
  websocket,
});


export default rootReducer;
