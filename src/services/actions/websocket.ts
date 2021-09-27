import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants/action-types';
import { TWsOrderRecieved } from '../types/data';


type TWsGetMessagePayload = {
  orders: Array<TWsOrderRecieved>;
  total: number;
  totalToday: number;
};

// Action types
export type TWsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
export type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}
export type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWsGetMessagePayload;
}


// All actions
export type wsActions =
  | TWsConnectionStart
  | TWsConnectionSuccess
  | TWsConnectionError
  | TWsConnectionClosed
  | TWsGetMessage;


// Action creators
export const wsConnectionStart =
  (url: string): TWsConnectionStart => ({
    type: WS_CONNECTION_START,
    payload: url,
  });

export const wsConnectionSuccess =
  (): TWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS,
  });

export const wsConnectionError =
  (error: any): TWsConnectionError => ({
    type: WS_CONNECTION_ERROR,
    payload: error,
  });

export const wsConnectionClosed =
  (): TWsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED,
  });

export const wsGetMessage =
  (payload: TWsGetMessagePayload): TWsGetMessage => ({
    type: WS_GET_MESSAGE,
    payload,
  });

