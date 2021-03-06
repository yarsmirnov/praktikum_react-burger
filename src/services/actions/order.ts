import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  ORDER_RESET_REQUEST_STATUS
} from '../constants/action-types';
import { orderRequest } from '../api';
import { TOrderRecieved } from '../types/data';
import { TOrderSendData } from '../types/api';
import { refreshToken } from './user';
import { AppThunk } from '../types';


// Action types
export type TRequestAction = {
  readonly type: typeof ORDER_REQUEST;
}
export type TSuccessAction = {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: TOrderRecieved;
}
export type TFailureAction = {
  readonly type: typeof ORDER_FAILURE;
}
export type TResetRequestStatusAction = {
  readonly type: typeof ORDER_RESET_REQUEST_STATUS;
}


// All types
export type TOrderActions =
  | TRequestAction
  | TSuccessAction
  | TFailureAction
  | TResetRequestStatusAction;


// Action creators
export const requestAction =
  (): TRequestAction => ({
    type: ORDER_REQUEST,
  });

export const successAction =
  (payload: TOrderRecieved): TSuccessAction => ({
    type: ORDER_SUCCESS,
    payload,
  });

export const failureAction =
  (): TFailureAction => ({
    type: ORDER_FAILURE,
  });

export const resetRequestStatusAction =
  (): TResetRequestStatusAction => ({
    type: ORDER_RESET_REQUEST_STATUS,
  });


// Async actions
export const sendOrderRequestAction: AppThunk = (
  orderData: TOrderSendData
) => async (dispatch: AppThunk) => {
  dispatch(requestAction());

  await orderRequest(orderData)
    .then((res) => {
      if (!res.ok && !(res.status === 403)) {
        throw new Error('Failed send order request');
      };
      return res.json();
    })
    .then(data => {
      if (!data.success) throw data;
      dispatch(successAction({ ...data.order }));
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(orderRequest(orderData)));
      } else {
        dispatch(failureAction());
        console.error('Order request error:', err);
      }
    });
};
