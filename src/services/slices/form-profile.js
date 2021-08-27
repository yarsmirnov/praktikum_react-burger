import { createSlice } from "@reduxjs/toolkit";
import { getUserRequest, patchUserRequest } from "../api";


const initialState = {
  GET_USER_REQUEST: false,
  GET_USER_SUCCESS: false,
  GET_USER_FAILURE: false,

  PATCH_USER_REQUEST: false,
  PATCH_USER_SUCCESS: false,
  PATCH_USER_FAILURE: false,

  form: {
    email: "",
    password: "",
    name: "",
  },
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

    setLoadedUser: (state, action) => ({
      ...state,
      form: {
        ...action.payload,
      }
    }),

    clearForm: () => initialState,

    getRequest: (state) => ({
      ...state,
      GET_USER_REQUEST: true,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,
      form: {...state.form},
    }),

    getSuccess: (state) => ({
      ...state,
      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: true,
      GET_USER_FAILURE: false,
      form: {...state.form},
    }),

    getFailure: (state) => ({
      ...state,
      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: true,
      form: {...state.form},
    }),

    patchRequest: (state) => ({
      ...state,
      PATCH_USER_REQUEST: true,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,
      form: {...state.form}
    }),

    patchSuccess: (state) => ({
      ...state,
      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: true,
      PATCH_USER_FAILURE: false,
      form: {...state.form}
    }),

    patchFailure: (state) => ({
      ...state,
      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: true,
      form: {...state.form}
    }),
  }
});


export const {
  setValue,
  setLoadedUser,
  clearForm,
  getRequest,
  getSuccess,
  getFailure,
  patchRequest,
  patchSuccess,
  patchFailure,
} = formProfileSlice.actions;


export const getUser = () => async (dispatch) => {
  dispatch(getRequest());

  getUserRequest()
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      dispatch(getFailure());
      throw new Error('Failed get user request');
    })
    .then(data => {
      if (data.success) {
        dispatch(setLoadedUser(data.user));
        dispatch(getSuccess());
      }
    })
    .catch(err => {
      dispatch(getFailure());
      console.error(err);
    });
};

export const patchUser = () => async (dispatch, getState) => {
  const formData = getState().formProfile.form;
  dispatch(patchRequest());

  patchUserRequest(formData)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      dispatch(patchFailure());
      throw new Error('Failed to patch new user data');
    })
    .then(data => {
      if (data.success) {
        dispatch(setLoadedUser(data.user));
        dispatch(patchSuccess());
      } else {
        dispatch(patchFailure());
      }
    })
    .catch(err => {
      dispatch(patchFailure());
      console.error(err);
    });
};


export default formProfileSlice.reducer;
