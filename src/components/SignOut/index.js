import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import Button from 'react-bootstrap/Button';

class SignOut extends Component{

    signout = () => { 
        this.props.firebase.doSignOut()
        .then(() => {
            this.props.history.push(ROUTES.SIGN_IN);
        })
        .catch(error => {
            console.log("fail to logout", error);
        })
    }

    render(){
        return (
            <Button type="submit" onClick={this.signout}>
            Sign Out
            </Button>
        )
    }
}
const SignOutButton = compose(
    withRouter,
    withFirebase
)(SignOut);

export {SignOutButton}