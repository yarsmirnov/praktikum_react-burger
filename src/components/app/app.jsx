import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredients';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <React.Fragment>
      <AppHeader />
      <main className={'main text_type_main-default'}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </React.Fragment>
  );
};


export default App;
