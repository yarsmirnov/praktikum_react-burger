import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  wsConnected: false,
  messages: [],
  error: ''
};


export const websocketSlice = createSlice({
  name: 'WS',
  initialState,
  reducers: {
    CONNECTION_START: () => initialState,

    CONNECTION_SUCCESS: (state) => {
      return {
        ...state,
        error: null,
        wsConnected: true
      }
    },

    CONNECTION_ERROR: (state, action) => {
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      }
    },

    CONNECTION_CLOSED: (state, action) => {
      return {
        ...state,
        error: null,
        wsConnected: false
      }
    },

    GET_MESSAGE: (state, action) => {
      return {
        ...state,
        error: null,
        messages: action.payload
      };
    },
  }
});


export const {
  CONNECTION_START,
  CONNECTION_SUCCESS,
  CONNECTION_ERROR,
  CONNECTION_CLOSED,
  GET_MESSAGE,
} = websocketSlice.actions;


export default websocketSlice.reducer;
