import { createSlice } from '@reduxjs/toolkit';


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
        {...action.payload}
      ],
    }),

    removeItem: (store, action) => ({
      ...store,
      items: [...store.items].filter(item => item.uuid !== action.payload),
    }),

    moveItem: (store, action) => {
      const dragIndex = action.payload.dragged;
      const hoverIndex = action.payload.hovered;

      if (dragIndex === hoverIndex) {
        return store;
      }

      const updatedItems = [...store.items];
      updatedItems.splice(hoverIndex, 0, updatedItems.splice(dragIndex, 1)[0]);

      return ({
        ...store,
        items: [...updatedItems],
      })
    },

    setBun: (store, action) => {
      const bunIndex = [...store.items].findIndex(
        item => item.type === 'bun');

      if (bunIndex >= 0) {
        const updatedIngredients = [...store.items];

        updatedIngredients.splice(bunIndex, 1, {
          ...action.payload,
        });

        return ({
          ...store,
          items: updatedIngredients
        });
      }
      return ({
        ...store,
        items: [...store.items,
          { ...action.payload }
        ],
      });
    },

    clearConstructor: () => initialState,
  },
});


export const {
  addItem,
  removeItem,
  moveItem,
  setBun,
  clearConstructor
} = burgerConstructorSlide.actions;


export default burgerConstructorSlide.reducer;
