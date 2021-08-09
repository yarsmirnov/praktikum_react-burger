import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';


const initialState = {
  value: [],
};


export const burgerConstructorSlide = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addItem: (store, action) => ({
      ...store,
      value: [...store.value,
        {...action.payload, uuid: uuidv4()}
      ],
    }),
  },
});

export const { addItem } = burgerConstructorSlide.actions;


export default burgerConstructorSlide.reducer;
