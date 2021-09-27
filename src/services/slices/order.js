import { createSlice } from '@reduxjs/toolkit';
import { orderRequest } from '../api';
import { refreshToken } from './user';


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
      ORDER_FAILURE: false,
      orderData: {...action.payload}
    }),

    failure: () => ({
      ...initialState,
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: true,
    }),

    resetRequestStatus: (state) => ({
      ...initialState,
      orderData: {...state.orderData}
    }),
  },
});


export const {
  request,
  success,
  failure,
  resetRequestStatus
} = orderSlice.actions;


export const sendOrderRequest = (orderData) => async (dispatch) => {
  dispatch(request());

  await orderRequest(orderData)
    .then((res) => {
      if (!res.ok && !res.status === 403) {
        throw new Error('Failed send order request');
      };
      return res.json();
    })
    .then(data => {
      if (!data.success) throw data;
      dispatch(success({ name: data.name, ...data.order }));
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
