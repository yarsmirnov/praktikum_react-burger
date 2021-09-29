import React, { useEffect, useCallback, FC } from 'react';

import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredient-card';

import { TIngredient } from '../../services/types/data';

import styles from './ingredient-section.module.css';


type TIngredientSectionProps = {
  title: string;
  ingredients: Array<TIngredient>;
  isActive: boolean;
  sectionRef: React.RefObject<HTMLInputElement|null> | null;
  titleRef: React.RefObject<HTMLInputElement|null> | null;
}

const IngredientSection: FC<TIngredientSectionProps> = ({
  title,
  ingredients,
  isActive,
  sectionRef,
  titleRef,
}) => {

  const scrollIntoHeading = useCallback(() => {
    if (isActive && sectionRef?.current) {
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
    <section className='pt-10' key={title} ref={sectionRef as any}>
      <h2
        className={`${styles.title} text_type_main-medium mb-6`}
        ref={titleRef as any}
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


export default IngredientSection;
