import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';

// TODO: if there is a user signed in then don't display sign in link any more
class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userStatusChange;
    if (this.props.username === '') {
      userStatusChange = <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>;
    }
    else {
      userStatusChange = 
        <button type="submit" onClick={this.props.onSignOut}>
          Sign Out
        </button>;
    }
    return (
    <div>
      <h1>{this.props.username}</h1>
      <ul>
        {userStatusChange}
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
      </ul>
    </div>
  )}
  };
 
export default Navigation;