import React from "react";
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { openModalAction } from '../../services/actions/modal';

import { ingredientType, orderType } from '../../utils/types';

import FeedCard from "./feed-card";
import OrderInfo from "../order-info/order-info";

import styles from './orders-feed.module.css';


const OrdersFeed = ({ orders, ingredientsList }) => {
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


OrdersFeed.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(orderType)).isRequired,
  ingredientsList: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
}

export default OrdersFeed;

