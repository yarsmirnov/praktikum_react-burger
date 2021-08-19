import {combineReducers} from 'redux';

import ingredients from '../slices/ingredients';
import ingredientInfo from '../slices/ingredient-info';
import burgerConstructor from '../slices/burger-constructor';
import order from '../slices/order';


const rootReducer = combineReducers({
  ingredients,
  ingredientInfo,
  burgerConstructor,
  order,
})


export default rootReducer;
