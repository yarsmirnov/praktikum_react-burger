import {combineReducers} from 'redux';

import ingredients from '../slices/ingredients';
import ingredientInfo from '../slices/ingredient-info';
import burgerConstructor from '../slices/burger-constructor';
import order from '../slices/order';
import formForgotPassword from '../slices/form-forgot-password';
import formResetPassword from '../slices/form-reset-password';


const rootReducer = combineReducers({
  ingredients,
  ingredientInfo,
  burgerConstructor,
  order,
  formForgotPassword,
  formResetPassword,
})


export default rootReducer;
