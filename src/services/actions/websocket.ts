import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
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
  readonly payload: Event | string;
}
export type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWsGetMessagePayload;
}
export type TWsSendMessage = {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
}


// All actions
export type TWsActions =
  | TWsConnectionStart
  | TWsConnectionSuccess
  | TWsConnectionError
  | TWsConnectionClosed
  | TWsGetMessage
  | TWsSendMessage;


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
  (error: Event | string): TWsConnectionError => ({
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

