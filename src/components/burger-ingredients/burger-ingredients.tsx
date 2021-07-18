import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import styles from './burger-ingredients.module.css';


const filterByType = (items, type) => {
  return items.filter(item => item.type === type);
};

const generateCatalogSection = (title, items) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className='pt-10'>
      <h2
        className={`${styles.catalogTitle} text_type_main-medium mb-6`}
      >
        {title}
      </h2>
      <div
        className={`${styles.catalogContent} pl-4`}
      >
        {items.map(item => (
          <BurgerIngredientCard
            id={item._id}
            name={item.name}
            price={item.price}
            img={item.image}
            count={0}
          />
        ))}
      </div>
    </section>
  );
};

const generateCatalog = (ingredients) => {
  const buns = filterByType(ingredients, 'bun');
  const sauces = filterByType(ingredients, 'sauce');
  const fillings = filterByType(ingredients, 'main');

  return (
    <>
      {generateCatalogSection('Булки', buns)}
      {generateCatalogSection('Соусы', sauces)}
      {generateCatalogSection('Начинка', fillings)}
    </>
  );
}


const BurgerIngredients = ({ ingredients }) => {
  return (
    <section className='column mr-10'>
      <h1 className={`${styles.sectionTitle} text_type_main-large pt-10 mb-5`}>
        Соберите бургер
      </h1>

      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={true} onClick={() => null}>
          Булки
        </Tab>
        <Tab value="sauce" active={false} onClick={() => null}>
          Соусы
        </Tab>
        <Tab value="main" active={false} onClick={() => null}>
          Начинки
        </Tab>
      </div>

      <div
        className={`${styles.catalog} scroller`}
      >
        {generateCatalog(ingredients)}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
};


export default BurgerIngredients;
