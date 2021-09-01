import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loadUserData } from '../../services/slices/user';
import { getIngredients } from '../../services/slices/ingredients';
import { closeModal } from '../../services/slices/modal';

import { useLocation, useHistory } from 'react-router-dom';

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
  IngredientPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  NotFound404,
} from '../../pages';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';


const ModalSwitch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { isOpen } = useSelector(store => store.modal);

  const handleModalClose = () => {
    dispatch(closeModal());
    history.goBack();
  };

  return (
    <div>
      <Switch location={background || location}>
        <Route path='/' exact>
          <HomePage />
        </Route>

        <Route path='/login' exact>
          <LoginPage />
        </Route>

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
          <IngredientPage />
        </Route>

        <Route>
          <NotFound404 />
        </Route>
      </Switch>

        { background
          && isOpen
          && (
            <Route path='/ingredients/:id' exact>
              <Modal closeModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            </Route>
          )
        }
    </div>
  );
};


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
};


export default App;
