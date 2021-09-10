import {
  CONNECTION_SUCCESS,
  CONNECTION_ERROR,
  CONNECTION_CLOSED,
  GET_MESSAGE,
} from '../slices/websocket';


export const socketMiddleware = () => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === 'WS/CONNECTION_START') {
        const wsUrl = action.payload;
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(CONNECTION_SUCCESS(event));
        };

        socket.onerror = event => {
          dispatch(CONNECTION_ERROR(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(GET_MESSAGE(parsedData));
        };

        socket.onclose = event => {
          dispatch(CONNECTION_CLOSED(event));
        };

        if (type === 'WS/SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
