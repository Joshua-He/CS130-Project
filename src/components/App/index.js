import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
 
import Navigation from '../Navigation';
//import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
//import PasswordForgetPage from '../PasswordForget';
//import HomePage from '../Home';
 
import * as ROUTES from '../../constants/routes';

// TODO: Add more components
// <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
// <Route path={ROUTES.HOME} component={HomePage} />
// <Route exact path={ROUTES.LANDING} component={LandingPage} />
const App = () => (
  <Router>
    <div>
      <Navigation />
 
      <hr />
      
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      
    </div>
  </Router>
);
 
export default App;