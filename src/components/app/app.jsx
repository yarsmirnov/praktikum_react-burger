import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { adaptIngredients } from '../../utils/adapter';

import { IngredientsContext } from '../../contexts/ingredients-context';


const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients';


const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      fetch(ingredientsApi)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Responsed with status ${response.status}`);
        })
        .then(dataContainer => {
          if (dataContainer.success) {
            const ingredients = adaptIngredients(dataContainer.data);
            setIngredients(ingredients);
          } else {
            throw new Error(`Get data finished with no success`);
          }
        })
        .catch(err => {
          console.log('Error:', err);
        })
    };

    getIngredients();
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      <main className={'main text_type_main-default'}>
        <IngredientsContext.Provider
          value={{ingredients, setIngredients}}
        >
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </React.Fragment>
  );
};


export default App;
