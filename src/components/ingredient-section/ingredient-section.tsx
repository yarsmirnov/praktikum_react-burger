import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import styles from './ingredient-section.module.css';


const IngredientSection = ({ title, ingredients }) => {
  if (ingredients.length === 0) {
    return null;
  }

  return (
    <section className='pt-10' key={title}>
      <h2
        className={`${styles.title} text_type_main-medium mb-6`}
      >
        {title}
      </h2>
      <ul
        className={`${styles.items} pl-4`}
      >
        {ingredients.map(item => (
          <li key={item._id}>
            <BurgerIngredientCard
              id={item._id}
              name={item.name}
              price={item.price}
              img={item.image}
              count={0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};


IngredientSection.propType = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })),
};


export default IngredientSection;
