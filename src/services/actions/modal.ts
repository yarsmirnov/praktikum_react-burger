import { ElementType } from 'react';
import {
  MODAL_OPEN_MODAL,
  MODAL_CLOSE_MODAL
} from '../constants/action-types';


type TModalChild = ElementType | null;

// Action types
export type TOpenModalAction = {
  readonly type: typeof MODAL_OPEN_MODAL;
  readonly payload: TModalChild;
}
export type TCloseModalAction = {
  readonly type: typeof MODAL_CLOSE_MODAL;
}


// All types
export type ModalActions =
  | TOpenModalAction
  | TCloseModalAction;


// Action creators
export const openModalAction =
  (payload: TModalChild): TOpenModalAction => ({
    type: MODAL_OPEN_MODAL,
    payload,
  });

export const closeModalAction =
  (): TCloseModalAction => ({
    type: MODAL_CLOSE_MODAL,
  });
