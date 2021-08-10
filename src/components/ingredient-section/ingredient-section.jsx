import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient-section.module.css';

import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';

import { ingredientType } from '../../utils/types';


const IngredientSection = ({
  title,
  ingredients,
  isActive,
  titleRef,
  onCardClick
}) => {

  const scrollIntoHeading = useCallback(() => {
    if (isActive && titleRef.current) {
      titleRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [isActive, titleRef]);

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
        ref={titleRef}
      >
        {title}
      </h2>
      <ul
        className={`${styles.items} pl-4`}
      >
        {ingredients.map(item => (
          <li key={item.id}>
            <BurgerIngredientCard
              { ...item }
              onCardClick={onCardClick}
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
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  titleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  onCardClick: PropTypes.func.isRequired,
};


export default IngredientSection;
