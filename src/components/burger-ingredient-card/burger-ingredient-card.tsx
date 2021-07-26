import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './burger-ingredient-card.module.css';
import modalStyles from '../modal/modal.module.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
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
          <>
            <img
              className='mb-4'
              src={imgLarge}
              alt={name}
              width='480'
              height='240'
            />
            <h3
              className={`${modalStyles.subtitle} text_type_main-medium mb-8`}
            >
              {name}
            </h3>
            <dl className={`${modalStyles.composition} text_type_main-default text_color_inactive`}>
              <div className={modalStyles.compositionItem}>
                <dt className='mb-2'>Калории,ккал</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {calories}
                </dd>
              </div>
              <div className={modalStyles.compositionItem}>
                <dt className='mb-2'>Белки, г</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {proteins}
                </dd>
              </div>
              <div className={modalStyles.compositionItem}>
                <dt className='mb-2'>Жиры, г</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {fat}
                </dd>
              </div>
              <div className={modalStyles.compositionItem}>
                <dt className='mb-2'>Углеводы, г</dt>
                <dd
                  className={'text_type_digits-default'}
                >
                  {carbohydrates}
                </dd>
              </div>
            </dl>
          </>
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
