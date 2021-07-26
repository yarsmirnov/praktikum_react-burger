import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-card.module.css';


const BurgerIngredientCard = ({ id, name, price, img, count = 0}) => {
  return (
    <div className={styles.card} key={id}>
      <img
        className={`${styles.image} pb-1`}
        src={img}
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
    </div>
  );
}


BurgerIngredientCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  count: PropTypes.number,
};


export default BurgerIngredientCard;
