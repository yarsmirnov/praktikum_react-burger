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

    removeItem: (store, action) => ({
      ...store,
      value: [...store.value].filter(item => item.uuid !== action.payload),
    }),

    insertItemBefore: (store, action) => {
      const updatedIngredients = [...store.value];
      const oldIndex = updatedIngredients
        .findIndex(item => item.uuid === action.payload.dragged);

      const draggedItem = updatedIngredients.splice(oldIndex, 1);

      const newIndex = updatedIngredients.findIndex(item => item.uuid === action.payload.before);

      updatedIngredients.splice(newIndex, 0, ...draggedItem);

      return ({
        ...store,
        value: updatedIngredients
      });
    },

    setBun: (store, action) => {
      const bunIndex = [...store.value].findIndex(
        item => item.type === 'bun');

      if (bunIndex >= 0) {
        const updatedIngredients = [...store.value];

        updatedIngredients.splice(bunIndex, 1, {
          ...action.payload,
          uuid: uuidv4()
        });

        return ({
          ...store,
          value: updatedIngredients
        });
      }
      return ({
        ...store,
        value: [...store.value,
          {...action.payload, uuid: uuidv4()}
        ],
      });
    },
  },
});

export const {
  addItem,
  removeItem,
  insertItemBefore,
  setBun
} = burgerConstructorSlide.actions;


export default burgerConstructorSlide.reducer;
