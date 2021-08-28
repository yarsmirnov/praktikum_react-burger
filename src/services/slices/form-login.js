import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: {
    email: "",
    password: "",
  }
};


export const formRegisterSlice = createSlice({
  name: 'formLogin',
  initialState,
  reducers: {
    setValue: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        [action.payload.name]: action.payload.value,
      }
    }),

    clearForm: () => initialState,
  }
});


export const {
  setValue,
  clearForm,
} = formRegisterSlice.actions;


export default formRegisterSlice.reducer;
