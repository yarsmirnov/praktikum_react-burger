import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';
import styles from './ingredient-section.module.css';


const IngredientSection = ({ title, ingredients, isActive }) => {
  const headingRef = useRef<any>(null);

  const scrollIntoHeading = useCallback(() => {
    if (isActive && headingRef.current) {
      headingRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [isActive]);

  useEffect(() => {
    scrollIntoHeading();
  }, [scrollIntoHeading])

  if (ingredients.length === 0) {
    return null;
  }

  return (
    <section className='pt-10' key={title}>
      <h2
        className={`${styles.title} text_type_main-medium mb-6`}
        ref={headingRef}
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
              imgLarge={item.image_large}
              proteins={item.proteins}
              fat={item.fat}
              carbohydrates={item.carbohydrates}
              calories={item.calories}
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
  isActive: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })),
};


export default IngredientSection;
