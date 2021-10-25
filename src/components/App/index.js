import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as ROUTES from '../../constants/routes';

const UsernameContext = React.createContext(''); // create context to display username

class AppBase extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  onUsernameChange = (username) => {this.setState({username: username});}
  
  render() {
    return (
      <Router>
        <div>
          <Navigation username={this.state.username} />
    
          <hr />
          <UsernameContext.Provider value={this.state.username}>
            <Route path={ROUTES.SIGN_UP} render={()=><SignUpPage onUsernameChange={this.onUsernameChange}/>} />
            <Route path={ROUTES.SIGN_IN} render={()=><SignInPage onUsernameChange={this.onUsernameChange}/>}/>
          </UsernameContext.Provider>   
          
        </div>
      </Router>
    )
    
  }
}
 
export default AppBase;