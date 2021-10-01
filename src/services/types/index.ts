import store from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TFormForgotPasswordActions } from '../actions/form-forgot-password';
import { TFormLoginActions } from '../actions/form-login';
import { TFormProfileActions } from '../actions/form-profile';
import { TFormRegisterActions } from '../actions/form-register';
import { TFormResetPasswordActions } from '../actions/form-reset-password';
import { TIngredientActions } from '../actions/ingredients';
import { ModalActions } from '../actions/modal';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/websocket';


export type RootState = ReturnType<typeof store.getState>;

// Typinп application actions
export type TApplicationActions =
  | TBurgerConstructorActions
  | TFormForgotPasswordActions
  | TFormLoginActions
  | TFormProfileActions
  | TFormRegisterActions
  | TFormResetPasswordActions
  | TIngredientActions
  | ModalActions
  | TOrderActions
  | TUserActions
  | TWsActions;


// Typing application thunk's
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, Action, TApplicationActions>
>;


export type AppDispatch = typeof store.dispatch;
