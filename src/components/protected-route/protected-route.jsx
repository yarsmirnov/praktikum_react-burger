import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadUserData } from '../../services/slices/user';
import { useSelector, useDispatch } from 'react-redux';


const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  let { user } = useSelector(store => store.user);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          children
        ) : (
          <Redirect
            to='/login'
          />
        )
      }
    />
  );
};


ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};


export default ProtectedRoute;
