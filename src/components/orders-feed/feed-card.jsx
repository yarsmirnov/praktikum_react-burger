import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { ingredientType, orderType } from '../../utils/types';
import { getIngredientsData } from '../../utils/utils';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './orders-feed.module.css';
import PreviewItem from './preview-item';


const MAX_INGREDIENTS_PREVIEW = 6;


const FeedCard = ({
  orderInfo,
  ingredientsList
}) => {
  const {
    ingredients,
    name,
    createdAt,
    number
  } = orderInfo;
  const orderDate = createdAt;

  const ingredientsData = useMemo(
    () => getIngredientsData(ingredients, ingredientsList),
    [ingredients, ingredientsList]
  );

  const totalPrice = useMemo(
    () => ingredientsData.reduce((acc, item) => acc + item.price, 0),
    [ingredientsData]
  );

  const ingredientsToPreview = useMemo(
    () => ingredientsData.length > MAX_INGREDIENTS_PREVIEW
      ? ingredientsData.slice(0, MAX_INGREDIENTS_PREVIEW)
      : ingredientsData
  , [ingredientsData]);

  const leftItems = useMemo(() => {
    return (ingredientsData.length > MAX_INGREDIENTS_PREVIEW)
     ? ingredientsData.length - MAX_INGREDIENTS_PREVIEW
     : 0;
  }, [ingredientsData]);

  return (
    <div className={`${styles.card} p-6`}>
      <div className={`${styles.card_header} mb-6`}>
        <p className={`text text_type_digits-default`}>
          {`#${String(number).padStart(6, 0)}`}
        </p>
        <p className={`text text_type_main-default text_color_inactive`}>
          { orderDate }
        </p>
      </div>

      <h3 className={`text text_type_main-medium mb-6`}>
        { name }
      </h3>

      <div className={`${styles.card_footer}`}>
        <ul className={`${styles.card_ingredientsPreview}`}>
          { ingredientsToPreview.map(
              ({ img, name, count}) => (
                <PreviewItem
                  key={name}
                  img={img}
                  name={img}
                  count={count}
                />
              )
            )
          }
          { leftItems
            ? <PreviewItem key={'lastInfo'} leftItems={leftItems} />
            : null
          }
        </ul>

        <p className={`${styles.card_totalPrice} text text_type_digits-default`}>
          { totalPrice }
          <i className={`${styles.card_totalPriceIcon} ml-2`}>
            <CurrencyIcon type="primary" />
          </i>
        </p>
      </div>
    </div>
  )
};


FeedCard.propTypes = {
  orderInfo:PropTypes.shape(orderType).isRequired,
  ingredientsList: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
}


export default FeedCard;
