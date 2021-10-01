import React, { FC } from "react";
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { openModalAction } from '../../services/actions/modal';

import FeedCard from "./feed-card";
import OrderInfo from "../order-info/order-info";

import {
  TWsOrderRecieved,
  TIngredient
} from '../../services/types/data';

import styles from './orders-feed.module.css';


type TOrdersFeedProps = {
  orders: Array<TWsOrderRecieved>;
  ingredientsList: Array<TIngredient>;
}

const OrdersFeed: FC<TOrdersFeedProps> = ({ orders, ingredientsList }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { url } = useRouteMatch();

  if (!orders.length) {
    return (
      <p className={`text text_type_main-medium`}>
        Здесь пока ещё пусто
      </p>
    )
  }

  return (
    <ul className={`${styles.list} scroller`}>
      { orders.map((orderInfo) => (
        <li key={orderInfo._id}>
          <Link
            className={`${styles.list_link}`}
            to={{
              pathname: `${url}/${orderInfo.number}`,
              state: { background: location}
            }}
            onClick={() => {
              dispatch(openModalAction(OrderInfo));
            }}
          >
            <FeedCard
              orderInfo={orderInfo}
              ingredientsList={ingredientsList}
            />
          </Link>
        </li>
      ))

      }
    </ul>
  );

};


export default OrdersFeed;

