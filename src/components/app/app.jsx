import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { loadUserData } from '../../services/slices/user';
import { getIngredients } from '../../services/slices/ingredients';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from '../protected-route/protected-route';
import GuestRoute from '../guest-route/guest-route';
import {
  ForgotPasswordPage,
  HomePage,
  IngredietnPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>

        <GuestRoute path='/login' exact>
          <LoginPage />
        </GuestRoute>

        <GuestRoute path='/register' exact>
          <RegisterPage />
        </GuestRoute>

        <GuestRoute path='/forgot-password' exact>
          <ForgotPasswordPage />
        </GuestRoute>

        <GuestRoute path="/reset-password" exact>
          <ResetPasswordPage />
        </GuestRoute>

        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>

        <Route path='/ingredients/:id' exact>
          <IngredietnPage />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
