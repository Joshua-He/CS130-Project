import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  useLocation,
  Link,
  Route,
} from 'react-router-dom';
import UserPage from '../User';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import ForgetPasswordPage from '../ForgetPassword'
import * as ROUTES from '../../constants/routes';

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log("current location", location);
  if (pathname === ROUTES.WELCOME_PAGE) {
    return(
    <div>
      <h1>Welcome to kyoo</h1>
      <ul>
        <li><Link to={ROUTES.SIGN_UP}>Sign up</Link></li>
        <li><Link to={ROUTES.SIGN_IN}>Sign in</Link></li>
      </ul>
    </div>)
  }
  else{
    return null
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation/>
        <div>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.USER_PAGE} component={UserPage}/>
          <Route path={ROUTES.PASSWORD_FORGET} component={ForgetPasswordPage} />
        </div>
      </Router> 
    )
  }
}
 
export default App;