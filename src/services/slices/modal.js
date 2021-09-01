import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  ComponentToView: null,
};


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      return {
        isOpen: true,
        ComponentToView: action.payload
      }
    },

    closeModal: () => initialState,
  }
});


export const {
  openModal,
  closeModal
} = modalSlice.actions;


export default modalSlice.reducer;
