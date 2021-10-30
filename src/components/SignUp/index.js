import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { SignInLink } from '../SignIn';

const SignUpPage = (props) => (
    <div>
    <h1>SignUp</h1>
    <SignUpForm/>
    <SignInLink/>
    </div>
) 

const INITIAL_STATE = { 
    fullName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isInstructor: false,
    error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { fullName, email, passwordOne,isInstructor } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        return this.props.firebase.dbCreateUser(email,fullName,isInstructor,authUser.user.uid);
      })
      .then(()=>{
        console.log("Account created successfully")
        // TODO: tell user the account is registered successfully
        this.props.history.push(ROUTES.SIGN_IN);
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
        fullName,
        email,
        passwordOne,
        passwordTwo,
        isInstructor,
        error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    fullName === '';

    return (
        <form onSubmit={this.onSubmit}>
        <input
          name="fullName"
          value={fullName}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
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
        <label>Are you an instructor?</label>
        <select name="isInstructor" defaultValue={isInstructor}
          onChange={this.onChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
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