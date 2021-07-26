import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients';


const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      fetch(ingredientsApi)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Responsed with status ${response.status}`);
          }
          return response.json();
        })
        .then(dataContainer => {
          if (dataContainer.success) {
            setIngredients(dataContainer.data);
          } else {
            console.log(dataContainer);
            throw new Error(`Get data finished with no success`);
          }
        })
        .catch(err => {
          console.log(err);
        })
    };

    getIngredients();
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      <main className={'main text_type_main-default'}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </React.Fragment>
  );
};


export default App;
