import {combineReducers} from "redux";

import ingredietns from "../slices/ingredients";
import ingredientInfo from "../slices/ingredient-info";
import constructor from "../slices/constructor";
import order from "../slices/order";


const rootReducer = combineReducers({
  ingredietns,
  ingredientInfo,
  constructor,
  order,
})


export default rootReducer;
