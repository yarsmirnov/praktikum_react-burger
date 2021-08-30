import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getIngredients } from '../services/slices/ingredients';

import AppHeader from '../components/app-header/app-header';
import Loader from '../components/loader/loader';

import layoutStyles from './page-layout.module.css';
import styles from './ingredient.module.css';


export const IngredientPage = () => {
  const dispatch = useDispatch();
  const { items: ingredients } = useSelector(store => store.ingredients);

  const { id } = useParams();

  const ingredient = useMemo(
    () => ingredients.find(item => item.id === id),
    [ingredients, id]
  );

  if (!ingredients.length) {
    dispatch(getIngredients());
    return (
      <>
        <AppHeader />
        <div className={`${styles.loaderContainer} pt-30`}>
          <Loader />
        </div>
      </>
    );
  }

  if (!ingredient) {
    return (
      <>
        <AppHeader />
        <section className={`${layoutStyles.pageContainer}`}>
          <h2 className={`text text_type_main-large mb-20 pt-30`}>
            Ошибка!
          </h2>
          <p className={`text text_type_main-medium mb-4`}>
            Невозможно получить информацию об ингредиенте.
          </p>
          <p>
            <Link to='/' className={`${layoutStyles.link}`}>
              На главную
            </Link>
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <section className={`${layoutStyles.pageContainer} ${styles.container} center-children mt-30`}>
        <h1 className={`${styles.title} text text_type_main-large mt-10`}>
          Детали ингредиента
        </h1>

        <img
          className='mb-4'
          src={ingredient.imageLarge}
          alt={ingredient.name}
          width='480'
          height='240'
        />

        <h2
          className={`${styles.ingredientName} text_type_main-medium mb-8`}
        >
          {ingredient.name}
        </h2>

        <dl className={`${styles.composition} text_type_main-default text_color_inactive mb-15`}>
          <div className={styles.compositionItem}>
            <dt className='mb-2'>Калории,ккал</dt>
            <dd
              className={'text_type_digits-default'}
            >
              {ingredient.calories}
            </dd>
          </div>
          <div className={styles.compositionItem}>
            <dt className='mb-2'>Белки, г</dt>
            <dd
              className={'text_type_digits-default'}
            >
              {ingredient.proteins}
            </dd>
          </div>
          <div className={styles.compositionItem}>
            <dt className='mb-2'>Жиры, г</dt>
            <dd
              className={'text_type_digits-default'}
            >
              {ingredient.fat}
            </dd>
          </div>
          <div className={styles.compositionItem}>
            <dt className='mb-2'>Углеводы, г</dt>
            <dd
              className={'text_type_digits-default'}
            >
              {ingredient.carbohydrates}
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
};
