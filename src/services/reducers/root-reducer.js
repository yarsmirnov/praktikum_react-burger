import {combineReducers} from 'redux';

import user from '../slices/user';
import ingredients from '../slices/ingredients';
import ingredientInfo from '../slices/ingredient-info';
import burgerConstructor from '../slices/burger-constructor';
import order from '../slices/order';
import formRegister from '../slices/form-register';
import formForgotPassword from '../slices/form-forgot-password';
import formResetPassword from '../slices/form-reset-password';
import formLogin from '../slices/form-login';
import formProfile from '../slices/form-profile';


const rootReducer = combineReducers({
  user,
  ingredients,
  ingredientInfo,
  burgerConstructor,
  order,
  formRegister,
  formForgotPassword,
  formResetPassword,
  formLogin,
  formProfile,
})


export default rootReducer;
