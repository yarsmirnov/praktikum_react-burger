import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from '../actions/websocket';

export const socketMiddleware = store => {
  let socket = null;

  return next => action => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === 'WS_CONNECTION_START') {
      const wsUrl = action.payload;
      socket = new WebSocket(wsUrl);
    }

    if (socket) {
      socket.onopen = event => {
        dispatch(wsConnectionSuccess(event));
      };

      socket.onerror = event => {
        dispatch(wsConnectionError(event));
      };

      socket.onmessage = event => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        dispatch(wsGetMessage(parsedData));
      };

      socket.onclose = event => {
        dispatch(wsConnectionClosed(event));
      };

      if (type === 'WS_SEND_MESSAGE') {
        const message = payload;
        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};
