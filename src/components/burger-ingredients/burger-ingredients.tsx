import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';

import { ingredientType } from '../../utils/types';


const navTabs = [
  {id: 'bun', navTitle: 'Булки', sectionTitle: 'Булки'},
  {id: 'sauce', navTitle: 'Соусы', sectionTitle: 'Соусы'},
  {id: 'main', navTitle: 'Начинки', sectionTitle: 'Начинка'},
];

const filterByType = (items, type) => {
  return items.filter(item => item.type === type);
};


const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState(navTabs[0].id);

  return (
    <section className='column mr-10'>
      <h1 className={`${styles.sectionTitle} text_type_main-large pt-10 mb-5`}>
        Соберите бургер
      </h1>

      <div className={styles.navigation}>
        {navTabs.map(tab => {
          return (
            <Tab
              key={tab.id}
              value={tab.id}
              active={current === tab.id}
              onClick={() => setCurrent(tab.id)}
            >
              {tab.navTitle}
            </Tab>
          );
        })}
      </div>

      <div
        className={`${styles.catalog} scroller`}
      >
        {navTabs.map(tab => (
          <IngredientSection
            key={tab.id}
            title={tab.sectionTitle}
            isActive={current === tab.id}
            ingredients={filterByType(ingredients, tab.id)}
          />)
        )}
      </div>
    </section>
  );
}


BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
};


export default BurgerIngredients;
