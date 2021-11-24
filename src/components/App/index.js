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
import ForgetPasswordPage from '../ForgetPassword';
import QueuePage from '../Queue/queuePage';
import * as ROUTES from '../../constants/routes';
import '../../style/uclaTheme.scss';

class App extends Component {
  render() {
    return (
      <Router>
        {/* <Navigation /> */}
        <div>
          <Route exact path={'/'} component={SignInPage}/>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.USER_PAGE} component={UserPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={ForgetPasswordPage} />
          <Route path={ROUTES.QUEUE} component={QueuePage} />
        </div>
      </Router>
    )
  }
}

export default App;