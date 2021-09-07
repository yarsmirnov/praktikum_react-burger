import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  initialForm: {
    email: '',
    password: '',
    name: '',
  },

  form: {
    email: '',
    password: '',
    name: '',
  },
}


export const formProfileSlice = createSlice({
  name: 'formProfile',
  initialState,
  reducers: {
    setInitialValue: (state, action) => ({
      ...state,
      initialForm: {...state.initialForm, ...action.payload},
      form: {...state.initialForm, ...action.payload},
    }),

    setValue: (state, action) => ({
      ...state,
      initialForm: {...state.initialForm},
      form: {
        ...state.form,
        [action.payload.name]: action.payload.value,
      }
    }),

    resetForm: (state) => ({
      ...state,
      initialForm: {...state.initialForm},
      form: {...state.initialForm},
    }),

    clearForm: () => initialState,
  }
});


export const {
  setInitialValue,
  setValue,
  resetForm,
  clearForm,
} = formProfileSlice.actions;


export default formProfileSlice.reducer;
