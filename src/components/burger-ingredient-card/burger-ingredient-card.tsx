import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './burger-ingredient-card.module.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';


const BurgerIngredientCard = ({
  id,
  name,
  price,
  img,
  imgLarge,
  proteins,
  fat,
  carbohydrates,
  calories,
  count = 0
}) => {
  const [ showModal, setShowModal ] = useState(false);
  const cardRef = useRef(null);

  return (
    <>
      <a
        href='#nowhere'
        className={styles.card}
        key={id}
        ref={cardRef}
        onClick={(evt) => {
          evt.preventDefault();
            setShowModal(prev => !prev);
          console.log('showModal: ', showModal);
        }
        }
      >
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
      </a>

      {showModal && (
        <Modal
          toggleModal={setShowModal}
          title='Детали ингредиента'
        >
          <IngredientDetails
            name={name}
            imgLarge={imgLarge}
            proteins={proteins}
            fat={fat}
            carbohydrates={carbohydrates}
            calories={calories}
          />
        </Modal>
      )}
    </>
  );
}


BurgerIngredientCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  imgLarge: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  count: PropTypes.number,
};


export default BurgerIngredientCard;
