import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import dataIngredients from '../../utils/data.js';

const App = () => {
  return (
    <React.Fragment>
      <AppHeader />
      <main className={'main text_type_main-default'}>
        <BurgerIngredients ingredients={dataIngredients} />
        <BurgerConstructor ingredients={dataIngredients} />
      </main>
    </React.Fragment>
  );
};

export default App;
