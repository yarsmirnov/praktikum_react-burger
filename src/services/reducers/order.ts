import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  ORDER_RESET_REQUEST_STATUS
} from '../constants/action-types';
import { TOrderActions } from '../actions/order';
import { TOrderRecieved } from '../types/data';

type TState = {
  ORDER_REQUEST: boolean;
  ORDER_SUCCESS: boolean;
  ORDER_FAILURE: boolean;
  orderData: TOrderRecieved | {};
}

export const initialState = {
  ORDER_REQUEST: false,
  ORDER_SUCCESS: false,
  ORDER_FAILURE: false,
  orderData: {},
};


const orderReducer = (state = initialState, action: TOrderActions): TState => {
  switch (action.type) {

    case (ORDER_REQUEST): {
      return {
        ...state,
        ORDER_REQUEST: true,
        ORDER_SUCCESS: false,
        ORDER_FAILURE: false,
      }
    }

    case (ORDER_SUCCESS): {
      return {
        ...state,
        ORDER_REQUEST: false,
        ORDER_SUCCESS: true,
        ORDER_FAILURE: false,
        orderData: {...action.payload}
      }
    }

    case (ORDER_FAILURE): {
      return {
        ...initialState,
        ORDER_REQUEST: false,
        ORDER_SUCCESS: false,
        ORDER_FAILURE: true,
      }
    }

    case (ORDER_RESET_REQUEST_STATUS): {
      return {
        ...initialState,
        orderData: {...state.orderData}
      }
    }

    default: {
      return state
    }
  }
}


export default orderReducer;
