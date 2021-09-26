import { combineReducers } from 'redux';

import burgerConstructor from './burger-constructor';
import formForgotPassword from './form-forgot-password';
import formLogin from '../slices/form-login';
import formProfile from '../slices/form-profile';
import formRegister from '../slices/form-register';
import formResetPassword from '../slices/form-reset-password';
import ingredients from '../slices/ingredients';
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
