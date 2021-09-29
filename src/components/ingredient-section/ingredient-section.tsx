import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';

import { ingredientType } from '../../utils/types';

import styles from './ingredient-section.module.css';


const IngredientSection = ({
  title,
  ingredients,
  isActive,
  sectionRef,
  titleRef,
}) => {

  const scrollIntoHeading = useCallback(() => {
    if (isActive && sectionRef.current) {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [isActive, sectionRef]);

  useEffect(() => {
    scrollIntoHeading();
  }, [scrollIntoHeading])

  if (ingredients.length === 0) {
    return null;
  }

  return (
    <section className='pt-10' key={title} ref={sectionRef}>
      <h2
        className={`${styles.title} text_type_main-medium mb-6`}
        ref={titleRef}
      >
        { title }
      </h2>
      <ul
        className={`${styles.items} pl-4`}
      >
        {ingredients.map((item) => (
          <li key={item.id}>
            <BurgerIngredientCard
              { ...item }
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
  sectionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  titleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};


export default IngredientSection;
