import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { loadUserData } from '../../services/slices/user';
import { getIngredients } from '../../services/slices/ingredients';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
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

        <Route path='/login' exact>
          <LoginPage />
        </Route>

        <Route path='/register' exact>
          <RegisterPage />
        </Route>

        <Route path='/forgot-password' exact>
          <ForgotPasswordPage />
        </Route>

        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>

        <Route path='/profile'>
          <ProfilePage />
        </Route>

        <Route path='/ingredients/:id' exact>
          <IngredietnPage />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
