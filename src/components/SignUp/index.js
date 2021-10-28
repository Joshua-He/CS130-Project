import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = (props) => (
    <div>
    <h1>SignUp</h1>
    <SignUpForm onUserSignUp={props.onUsernameChange}/>
    </div>
) 

const INITIAL_STATE = { 
    fullname: '',
    email: '',
    passwordOne: '',
    isInstructor: false,
    passwordTwo: '',
    error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
  
  onClick = () => {this.setState({isInstructor: true})};

  onSubmit = event => {
    const { fullname, email, passwordOne, isInstructor } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.onUserSignUp(fullname);
        this.props.history.push(ROUTES.HOME);
        return this.props.firebase.dbCreateUser(email,fullname,isInstructor,authUser.user.uid);
      })
      .then(()=>{
        console.log("Account created successfully")
        // TODO: tell user the account is registered successfully
        // redirect user to signin page
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
        fullname,
        email,
        passwordOne,
        isInstructor,
        passwordTwo,
        error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    fullname === '';

    return (
        <form onSubmit={this.onSubmit}>
        <input
          name="fullname"
          value={fullname}
          onChange={this.onChange}
          type="text"
          placeholder="Full name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" onClick={this.onClick}>
            isInstructor
        </button>
        <button disabled={isInvalid} type="submit">
            Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase)

export default SignUpPage;
 
export { SignUpForm, SignUpLink };