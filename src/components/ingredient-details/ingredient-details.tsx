import React from "react";
import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css';


const IngredientDetails = ({
  name,
  imgLarge,
  calories,
  proteins,
  fat,
  carbohydrates
}) => {

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large mt-10`}>Детали ингредиента</h2>
      <img
        className='mb-4'
        src={imgLarge}
        alt={name}
        width='480'
        height='240'
      />
      <h3
        className={`${styles.ingredientName} text_type_main-medium mb-8`}
      >
        {name}
      </h3>
      <dl className={`${styles.composition} text_type_main-default text_color_inactive mb-15`}>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Калории,ккал</dt>
          <dd
            className={'text_type_digits-default'}
          >
            {calories}
          </dd>
        </div>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Белки, г</dt>
          <dd
            className={'text_type_digits-default'}
          >
            {proteins}
          </dd>
        </div>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Жиры, г</dt>
          <dd
            className={'text_type_digits-default'}
          >
            {fat}
          </dd>
        </div>
        <div className={styles.compositionItem}>
          <dt className='mb-2'>Углеводы, г</dt>
          <dd
            className={'text_type_digits-default'}
          >
            {carbohydrates}
          </dd>
        </div>
      </dl>
    </>
  );
};


IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  imgLarge: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
};


export default IngredientDetails;
