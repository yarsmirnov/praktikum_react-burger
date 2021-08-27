import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setData, clearData } from '../services/slices/ingredient-info';

import AppHeader from '../components/app-header/app-header';

import styles from './ingredient.module.css';


export const IngredietnPage = () => {
  const dispatch = useDispatch();

  const { items: ingredients } = useSelector(store => store.ingredients);
  const { data } = useSelector(store => store.ingredientInfo)
  const [ isLoaded, setIsLoaded ] = useState(false);
  const { id } = useParams();

  const ingredientData = useMemo(() => {
    return ingredients.find(item => item.id === id);
  }, [ingredients, id]);

  useEffect(() => {
    dispatch(setData(ingredientData));
    setIsLoaded(true);

    return () => {
      dispatch(clearData());
      setIsLoaded(false);
    };
  }, [dispatch, ingredientData, setIsLoaded]);

  return (
    <>
      <AppHeader />
      <section className={`${styles.container} center-children mt-30`}>
        { isLoaded
          ? (
          <>
            <h1 className={`${styles.title} text text_type_main-large mt-10`}>Детали ингредиента</h1>
            <img
              className='mb-4'
              src={data.imageLarge}
              alt={data.name}
              width='480'
              height='240'
            />
            <h2
              className={`${styles.ingredientName} text_type_main-medium mb-8`}
            >
              {data.name}
            </h2>
            <dl className={`${styles.composition} text_type_main-default text_color_inactive mb-15`}>
              <div className={styles.compositionItem}>
                <dt className='mb-2'>Калории,ккал</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {data.calories}
                </dd>
              </div>
              <div className={styles.compositionItem}>
                <dt className='mb-2'>Белки, г</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {data.proteins}
                </dd>
              </div>
              <div className={styles.compositionItem}>
                <dt className='mb-2'>Жиры, г</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {data.fat}
                </dd>
              </div>
              <div className={styles.compositionItem}>
                <dt className='mb-2'>Углеводы, г</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {data.carbohydrates}
                </dd>
              </div>
            </dl>
            </>
          ) : (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) }

      </section>
    </>
  );
};
