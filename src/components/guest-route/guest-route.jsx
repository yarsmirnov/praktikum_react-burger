import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const GuestRoute = ({ children, ...rest }) => {
  const { user } = useSelector(store => store.user);

  return (
    <Route
      {...rest}
      render={() =>
        !user ? (
          children
        ) : (
          <Redirect
            to='/'
          />
        )
      }
    />
  );
};


GuestRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};


export default GuestRoute;
