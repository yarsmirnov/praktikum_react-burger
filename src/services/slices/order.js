import { createSlice } from '@reduxjs/toolkit';
import { refreshToken, orderRequest } from '../api';

const initialState = {
  ORDER_REQUEST: false,
  ORDER_SUCCESS: false,
  ORDER_FAILURE: false,
  orderData: {},
};


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    request: (state) => ({
      ...state,
      ORDER_REQUEST: true,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
    }),

    success: (state, action) => ({
      ...state,
      ORDER_REQUEST: false,
      ORDER_SUCCESS: true,
      orderData: {...action.payload}
    }),

    failure: () => ({
      ...initialState,
      ORDER_FAILURE: true,
    }),
  },
});

const { request, success, failure } = orderSlice.actions;


export const sendOrderRequest = (orderData) => async (dispatch) => {
  dispatch(request());

  orderRequest(orderData)
    .then((res) => {
      if (!res.ok && !res.status === 403) {
        throw new Error('Failed send order request');
      };
      return res.json();
    })
    .then(data => {
      if (!data.success) throw data;
      dispatch(success({name: data.name, order: data.order}));
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(orderRequest(orderData)));
      } else {
        dispatch(failure());
        console.error('Order request error:', err);
      }
    });
};


export default orderSlice.reducer;
