import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../../services/hooks';


const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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


export default ProtectedRoute;
