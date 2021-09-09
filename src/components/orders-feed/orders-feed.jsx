import React from "react";
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ingredientType, orderType } from '../../utils/types';

import FeedCard from "./feed-card";

import styles from './orders-feed.module.css';


const OrdersFeed = ({ orders, ingredientsList }) => {
  const { url } = useRouteMatch();
  const { location } = useLocation();
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

