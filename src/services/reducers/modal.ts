import { ElementType } from 'react';
import {
  MODAL_OPEN_MODAL,
  MODAL_CLOSE_MODAL
} from '../constants/action-types';
import { ModalActions } from '../actions/modal';


type TState = {
  isOpen: boolean,
  ComponentToView: ElementType | null;
}

export const initialState: TState = {
  isOpen: false,
  ComponentToView: null,
};


const modalReducer = (state = initialState, action: ModalActions): TState => {
  switch (action.type) {

    case (MODAL_OPEN_MODAL): {
      return {
        isOpen: true,
        ComponentToView: action.payload,
      }
    }

    case (MODAL_CLOSE_MODAL): {
      return initialState
    }

    default: {
      return state
    }
  }
};


export default modalReducer;
