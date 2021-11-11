import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
class SignOut extends Component{

    signout = () => { 
        this.props.firebase.doSignOut()
        .then(() => {
            this.props.history.push(ROUTES.WELCOME_PAGE);
        })
        .catch(error => {
            console.log("fail to logout", error);
        })
    }

    render(){
        
        return (
            <button type="submit" onClick={this.signout}>
            Sign Out
            </button>
        )
    }
}
const SignOutButton = compose(
    withRouter,
    withFirebase
)(SignOut);

export{ SignOutButton }