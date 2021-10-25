import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';
 
const Navigation = (props) => (
  <div>
    <h1>{props.username}</h1>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
    </ul>
  </div>
);
 
export default Navigation;