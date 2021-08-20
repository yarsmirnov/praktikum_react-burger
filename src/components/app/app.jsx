import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredients';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HomePage } from '../../pages';


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
      </Switch>
    </Router>
  );
};


export default App;
