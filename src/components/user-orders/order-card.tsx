import React, { useMemo, FC } from 'react';

import { getIngredientsData } from '../../utils/utils';
import { formatDate } from '../../utils/dates';

import PreviewItem from '../preview-item/preview-item';
import OrderStatus from '../order-status/order-status';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import {
  TWsOrderRecieved,
  TIngredient
} from '../../services/types/data';

import styles from './order-card.module.css';


type TOrderCardProps = {
  orderInfo: TWsOrderRecieved;
  ingredientsList: Array<TIngredient>;
}


const MAX_INGREDIENTS_PREVIEW: number = 10;


const OrderCard: FC<TOrderCardProps> = ({
  orderInfo,
  ingredientsList
}) => {
  const {
    ingredients,
    name,
    createdAt,
    number,
    status
  } = orderInfo;
  const dateToShow = formatDate(createdAt);

  const ingredientsData = useMemo(
    () => getIngredientsData(ingredients, ingredientsList),
    [ingredients, ingredientsList]
  );

  const totalPrice = useMemo(
    () => ingredientsData.reduce((acc, item) => acc + item.price * item.count, 0),
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
    <div
      className={`${styles.card} text text_type_main-default p-6`}
    >
      <div className={`${styles.card_header} mb-6`}>
        <p className={`text text_type_digits-default`}>
          {`#${String(number).padStart(6, '0')}`}
        </p>
        <p className={`text text_type_main-default text_color_inactive`}>
          { dateToShow }
        </p>
      </div>

      <h3 className={`text text_type_main-medium mb-2`}>
        { name }
      </h3>

      <p className={`text mb-6`}>
        <OrderStatus status={status} />
      </p>

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
  );

};


export default OrderCard;
