import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredients';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  IngredietnPage,
  ForgotPasswordPage
} from '../../pages';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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

        <Route path='/ingredients/:id' exact>
          <IngredietnPage />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
