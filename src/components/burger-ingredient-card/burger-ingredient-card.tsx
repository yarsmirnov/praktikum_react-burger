import React, { FC } from 'react';

import { useDispatch } from '../../services/hooks';
import { openModalAction } from '../../services/actions/modal';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { TIngredient } from '../../services/types/data';

import styles from './burger-ingredient-card.module.css';


const BurgerIngredientCard: FC<TIngredient> = ({
  id,
  type,
  name,
  price,
  image,
  proteins,
  fat,
  carbohydrates,
  calories,
  count,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {
      id,
      type,
      name,
      price,
      image,
      proteins,
      fat,
      carbohydrates,
      calories,
    }
  });


  return (
    <>
      <Link
        to={{
          pathname: `/ingredients/${id}`,
          state: { background: location}
        }}
        className={styles.card}
        key={id}
        ref={dragRef}
        onClick={() => {
          dispatch(openModalAction(IngredientDetails));
        }}
      >
        <img
          className={`${styles.image} pb-1`}
          src={image}
          alt={name}
        />
        <span className={`${styles.price} text_type_digits-default mb-1`}>
          { price }
          <i className='ml-2'>
            <CurrencyIcon type="primary" />
          </i>
        </span>

        <h3 className={`${styles.title} text_type_main-default`}>
          { name }
        </h3>

        { count
            ? (<i className={styles.counter}>
                <Counter count={count} size="default" />
              </i>)
            : null
        }
      </Link>
    </>
  );
}


export default BurgerIngredientCard;
