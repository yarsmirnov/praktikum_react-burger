import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setData } from '../../services/slices/ingredient-info';

import styles from './burger-ingredient-card.module.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../utils/types';


const BurgerIngredientCard = ({
  id,
  name,
  price,
  image,
  imageLarge,
  proteins,
  fat,
  carbohydrates,
  calories,
  onCardClick,
  count = 0,
}) => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const handleCardClick = () => {
    dispatch(setData({
      name,
      imageLarge,
      calories,
      proteins,
      fat,
      carbohydrates,
    }));
  };

  return (
    <>
      <a
        href='#nowhere'
        className={styles.card}
        key={id}
        ref={cardRef}
        onClick={(evt) => {
          evt.preventDefault();
          handleCardClick();
          onCardClick();
        }}
      >
        <img
          className={`${styles.image} pb-1`}
          src={image}
          alt={name}
        />
        <span className={`${styles.price} text_type_digits-default mb-1`}>
          {price}
          <i className='ml-2'>
            <CurrencyIcon type="primary" />
          </i>
        </span>

        <h3 className={`${styles.title} text_type_main-default`}>
          {name}
        </h3>

        {count ?
          (<i className={styles.counter}>
            <Counter count={count} size="default" />
          </i>):
          null}
      </a>
    </>
  );
}


BurgerIngredientCard.propTypes = {
  ...ingredientType,
  count: PropTypes.number,
  onCardClick: PropTypes.func.isRequired,
};


export default BurgerIngredientCard;
