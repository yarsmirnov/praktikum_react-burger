import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector((store) => store.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user
         ? ( children )
         : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
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
