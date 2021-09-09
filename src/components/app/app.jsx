import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loadUserData } from '../../services/slices/user';
import { getIngredients } from '../../services/slices/ingredients';
import { closeModal } from '../../services/slices/modal';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";

import ProtectedRoute from '../protected-route/protected-route';
import GuestRoute from '../guest-route/guest-route';
import {
  FeedPage,
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  OrderPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  NotFound404,
} from '../../pages';

import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';


const ModalSwitch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = (history.action === 'PUSH' || history.action === 'REPLACE')
    && location.state
    && location.state.background;
  const { isOpen } = useSelector((store) => store.modal);

  const handleModalClose = () => {
    dispatch(closeModal());
    history.goBack();
  };

  return (
    <>
      <AppHeader />

      <main className='container'>
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

          <Route path='/feed' exact>
            <FeedPage />
          </Route>

          <Route path='/feed/:id' exact>
            <OrderPage />
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
              </Modal>
            </Route>
          )
        }

        { background
          && isOpen
          && (
            <Route path='/order' exact>
              <Modal closeModal={handleModalClose}>
              </Modal>
            </Route>
          )
        }
      </main>
    </>
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
