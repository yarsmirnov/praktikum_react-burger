import {
  BURGER_CONSTRUCTOR_ADD_ITEM,
  BURGER_CONSTRUCTOR_REMOVE_ITEM,
  BURGER_CONSTRUCTOR_MOVE_ITEM,
  BURGER_CONSTRUCTOR_SET_BUN,
  BURGER_CONSTRUCTOR_CLEAR_CONSTRUCTOR,
} from '../constants/action-types';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TConstructorIngredient } from '../types/data';


type TState = {
  items: Array<TConstructorIngredient>
}

const initialState: TState = {
  items: [],
};

const BurgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TState => {
  switch (action.type) {

    case BURGER_CONSTRUCTOR_ADD_ITEM: {
      return {
        ...state,
        items: [ ...state.items, {...action.payload} ],
      }
    }

    case BURGER_CONSTRUCTOR_REMOVE_ITEM: {
      return {
        ...state,
      items: [...state.items].filter(item => item.uuid !== action.payload),
      }
    }

    case BURGER_CONSTRUCTOR_MOVE_ITEM: {
      const dragIndex = action.payload.dragged;
      const hoverIndex = action.payload.hovered;

      if (dragIndex === hoverIndex) {
        return state;
      }

      const updatedItems = [...state.items];
      updatedItems.splice(hoverIndex, 0, updatedItems.splice(dragIndex, 1)[0]);

      return ({
        ...state,
        items: [...updatedItems],
      })
    }

    case BURGER_CONSTRUCTOR_SET_BUN: {
      const bunIndex = [...state.items]
        .findIndex(item => item.type === 'bun');

      if (bunIndex >= 0) {
        const updatedIngredients = [...state.items];

        updatedIngredients
          .splice(bunIndex, 1, { ...action.payload });

        return ({
          ...state,
          items: updatedIngredients
        });
      }

      return ({
        ...state,
        items: [...state.items,
          { ...action.payload }
        ],
      });
    }

    case BURGER_CONSTRUCTOR_CLEAR_CONSTRUCTOR: {
      return initialState
    }

    default:
      return state;
  }
};


export default BurgerConstructorReducer;
