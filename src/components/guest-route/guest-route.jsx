import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadUserData } from '../../services/slices/user';
import { useSelector, useDispatch } from 'react-redux';


const GuestRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

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
