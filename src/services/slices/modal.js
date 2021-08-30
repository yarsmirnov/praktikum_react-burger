import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: () => ({
      isOpen: true,
    }),

    closeModal: () => ({
      isOpen: false,
    }),
  }
});


export const {
  openModal,
  closeModal
} = modalSlice.actions;


export default modalSlice.reducer;
