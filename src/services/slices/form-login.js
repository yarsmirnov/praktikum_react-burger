import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  form: {
    email: "",
    password: "",
  }
};


export const formLoginSlice = createSlice({
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
} = formLoginSlice.actions;


export default formLoginSlice.reducer;
