import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  ORDER_REQUEST: false,
  ORDER_SUCCESS: false,
  ORDER_FAILURE: false,
  orderData: {},
};

const orderPostApi = 'https://norma.nomoreparties.space/api/orders';


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


export const sendOrderRequest = (data) => async (dispatch) => {
  dispatch(request());

  fetch(orderPostApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    dispatch(failure());
    throw new Error('Bad BurgerConstructor request');
  })
  .then(data => {
    if (data.success) {
      dispatch(success({name: data.name, order: data.order}));
    } else {
      dispatch(failure());
      throw new Error('BurgerConstructor got unsuccessful response');
    }
  })
  .catch(err => {
    dispatch(failure());
    console.error('Order request error:', err);
  });
}


export default orderSlice.reducer;
