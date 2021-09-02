import React, { useMemo } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/slices/ingredients';

import Loader from '../loader/loader';

import styles from './ingredient-details.module.css';


const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { items: ingredients } = useSelector((store) => store.ingredients);

  const { id } = useParams();

  const ingredient = useMemo(
    () => ingredients.find(item => item.id === id),
    [ingredients, id]);

  if (!ingredients.length) {
    dispatch(getIngredients());
    return (
      <div className={`${styles.loaderContainer}`}>
        <Loader />
      </div>
    );
  }

  if (!ingredient) {
    return (
      <>
        <h2 className={`text text_type_main-large mb-20`}>
          Ошибка!
        </h2>

        <p className={`text text_type_main-medium`}>
          Невозможно получить информацию об ингредиенте.
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large mt-10`}>Детали ингредиента</h2>
      <img
        className='mb-4'
        src={ingredient.imageLarge}
        alt={ingredient.name}
        width='480'
        height='240'
      />
      <h3
        className={`${styles.ingredientName} text_type_main-medium mb-8`}
      >
        { ingredient.name }
      </h3>
      <dl className={`${styles.composition} text_type_main-default text_color_inactive mb-15`}>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Калории,ккал</dt>
          <dd
            className={'text_type_digits-default'}
          >
            { ingredient.calories }
          </dd>
        </div>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Белки, г</dt>
          <dd
            className={'text_type_digits-default'}
          >
            { ingredient.proteins }
          </dd>
        </div>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Жиры, г</dt>
          <dd
            className={'text_type_digits-default'}
          >
            { ingredient.fat }
          </dd>
        </div>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Углеводы, г</dt>
          <dd
            className={'text_type_digits-default'}
          >
            { ingredient.carbohydrates }
          </dd>
        </div>
      </dl>
    </>
  );
};


export default IngredientDetails;
