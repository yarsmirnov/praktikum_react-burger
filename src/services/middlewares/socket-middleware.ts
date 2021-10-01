import { Middleware } from 'redux';
import {
  WS_CONNECTION_START,
  WS_SEND_MESSAGE
} from '../constants/action-types';
import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from '../actions/websocket';


export const socketMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return next => action => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === WS_CONNECTION_START) {
      const wsUrl = action.payload;
      socket = new WebSocket(wsUrl);
    }

    if (socket) {
      socket.onopen = () => {
        dispatch(wsConnectionSuccess());
      };

      socket.onerror = event => {
        dispatch(wsConnectionError(event));
      };

      socket.onmessage = event => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        dispatch(wsGetMessage(parsedData));
      };

      socket.onclose = () => {
        dispatch(wsConnectionClosed());
      };

      if (type === WS_SEND_MESSAGE) {
        const message = payload;
        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};
