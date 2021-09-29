import React, { FC } from 'react';
import { Route, Redirect, RouterProps } from 'react-router-dom';
import { useSelector } from '../../services/hooks';


const GuestRoute: FC<RouterProps> = ({ children, ...rest }) => {
  const { user } = useSelector((store) => store.user);

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


export default GuestRoute;
