import React, { useEffect, FC } from 'react';

import { useDispatch, useSelector } from '../../services/hooks';
import { loadUserData } from '../../services/actions/user';
import { getIngredientsAction } from '../../services/actions/ingredients';
import { closeModalAction } from '../../services/actions/modal';

import {
  BrowserRouter,
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
  ProfileOrdersPage,
  RegisterPage,
  ResetPasswordPage,
  NotFound404,
} from '../../pages';

import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';


const ModalSwitch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();
  const background = (history.action === 'PUSH' || history.action === 'REPLACE')
    && location.state
    && location.state.background;
  const { isOpen } = useSelector((store) => store.modal);

  const handleModalClose = () => {
    dispatch(closeModalAction());
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

          <ProtectedRoute path='/profile' exact>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path='/profile/orders' exact>
            <ProfileOrdersPage />
          </ProtectedRoute>

          <Route path='/profile/orders/:orderNumber' exact>
            <OrderPage />
          </Route>

          <Route path='/ingredients/:id' exact>
            <IngredientPage />
          </Route>

          <Route path='/feed' exact>
            <FeedPage />
          </Route>

          <Route path='/feed/:orderNumber' exact>
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

        { background
          && isOpen
          && (
            <Route path='/feed/:orderNumber' exact>
              <Modal closeModal={handleModalClose}>
              </Modal>
            </Route>
          )
        }

        { background
          && isOpen
          && (
            <Route path='/profile/orders/:orderNumber' exact>
              <Modal closeModal={handleModalClose}>
              </Modal>
            </Route>
          )
        }
      </main>
    </>
  );
};


const App: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
    dispatch(getIngredientsAction());
  }, [dispatch]);

  return (
    <BrowserRouter basename="/praktikum_react-burger">
      <ModalSwitch />
    </BrowserRouter>
  );
};


export default App;
