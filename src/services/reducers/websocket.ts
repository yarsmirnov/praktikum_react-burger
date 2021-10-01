import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants/action-types';
import { TWsActions } from '../actions/websocket';
import { TWsOrderRecieved } from '../types/data';


type TState = {
  wsConnected: boolean,
  orders: Array<TWsOrderRecieved>,
  total: number,
  totalToday: number,
  error: any
}

export const initialState: TState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};


const websocketReducer = (state = initialState, action: TWsActions): TState => {
  switch (action.type) {

    case (WS_CONNECTION_START): {
      return initialState
    }

    case (WS_CONNECTION_SUCCESS): {
      return {
        ...state,
        error: null,
        wsConnected: true
      }
    }

    case (WS_CONNECTION_ERROR): {
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      }
    }

    case (WS_CONNECTION_CLOSED): {
      return initialState
    }

    case (WS_GET_MESSAGE): {
      const { orders, total, totalToday } = action.payload;

      return {
        ...state,
        error: null,
        orders,
        total,
        totalToday,
      }
    }

    default: {
      return state
    }
  }
};

export default websocketReducer;
