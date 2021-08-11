import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';


const initialState = {
  items: [],
};


export const burgerConstructorSlide = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addItem: (store, action) => ({
      ...store,
      items: [...store.items,
        {...action.payload, uuid: uuidv4()}
      ],
    }),

    removeItem: (store, action) => ({
      ...store,
      items: [...store.items].filter(item => item.uuid !== action.payload),
    }),

    insertItemBefore: (store, action) => {
      if (action.payload.dragged === action.payload.before) {
        return store;
      }

      const updatedIngredients = [...store.items];
      const oldIndex = updatedIngredients
        .findIndex(item => item.uuid === action.payload.dragged);

      const draggedItem = updatedIngredients.splice(oldIndex, 1);

      const newIndex = updatedIngredients.findIndex(item => item.uuid === action.payload.before);

      updatedIngredients.splice(newIndex, 0, ...draggedItem);

      return ({
        ...store,
        items: updatedIngredients
      });
    },

    setBun: (store, action) => {
      const bunIndex = [...store.items].findIndex(
        item => item.type === 'bun');

      if (bunIndex >= 0) {
        const updatedIngredients = [...store.items];

        updatedIngredients.splice(bunIndex, 1, {
          ...action.payload,
          uuid: uuidv4()
        });

        return ({
          ...store,
          items: updatedIngredients
        });
      }
      return ({
        ...store,
        items: [...store.items,
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
