import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};


export const websocketSlice = createSlice({
  name: 'WS',
  initialState,
  reducers: {
    CONNECTION_START: (state) => initialState,

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

    CONNECTION_CLOSED: () => initialState,

    GET_MESSAGE: (state, action) => {
      const { orders, total, totalToday } = action.payload;
      return {
        ...state,
        error: null,
        orders,
        total,
        totalToday,
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
