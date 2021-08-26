import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UPDATE_PROFILE_REQUEST: false,
  UPDATE_PROFILE_SUCCESS: false,
  UPDATE_PROFILE_FAILURE: false,

  form: {
    email: "",
    password: "",
    name: "",
  }
}

export const formProfileSlice = createSlice({
  name: 'formProfile',
  initialState,
  reducers: {
    setValue: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        [action.payload.name]: action.payload.value,
      }
    }),

    resetForm: () => initialState,

    request: (state) => ({
      ...state,
      UPDATE_PROFILE_REQUEST: true,
      UPDATE_PROFILE_SUCCESS: false,
      UPDATE_PROFILE_FAILURE: false,
      form: {...state.form},
    }),

    success: (state) => ({
      ...state,
      UPDATE_PROFILE_REQUEST: false,
      UPDATE_PROFILE_SUCCESS: true,
      UPDATE_PROFILE_FAILURE: false,
      form: {...state.form},
    }),

    failure: (state) => ({
      ...state,
      UPDATE_PROFILE_REQUEST: false,
      UPDATE_PROFILE_SUCCESS: false,
      UPDATE_PROFILE_FAILURE: true,
      form: {...state.form},
    }),
  }
});


export const {
  setValue,
  resetForm,
  request,
  success,
  failure,
} = formProfileSlice.actions;


export default formProfileSlice.reducer;
