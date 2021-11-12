import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { SignInLink } from '../SignIn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpPage = (props) => (
  <div>
    <h1 style={{ textAlign: 'center', color: "#00005c", margin: "5%", }}>Sign Up</h1>

    <SignUpForm />

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

  signup = event => {
    const { fullName, email, passwordOne, isInstructor } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        return this.props.firebase.dbCreateUser(email, fullName, isInstructor, authUser.user.uid);
      })
      .then(() => {
        console.log("Account created successfully")
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  notifyChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let styles = {
      marginRight: '300px',
      marginLeft: '25%',
      marginBottom: '1%',
      width: '50%'
    }
    let stylesBox = {
      marginRight: '300px',
      marginLeft: '25%',
      marginBottom: '0%',
      width: '50%'
    }

    let styles2 = {
      marginRight: '300px',
      marginLeft: '25%',
      marginBottom: '1%',
      width: '50%',
      paddingTop: '13px',
      paddingBottom: '13px',
      marginTop: '20px',

    }
    let styles3 = {
      marginRight: '300px',
      marginLeft: '25%',
      marginBottom: '2%',
      width: '50%',
      color: 'blue',
      backgroundColor: "white"
    }
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

      <Form onSubmit={this.signup}>
        <Form.Group className="first" controlId="formBasicName" style={styles}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="name" name="fullName" placeholder="Enter name" value={fullName} onChange={this.notifyChange} />
        </Form.Group>
        <Form.Group className="email" controlId="formBasicEmail" style={styles}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={this.notifyChange} />

        </Form.Group>

        <Form.Group className="password" controlId="formBasicPassword" style={styles}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="passwordOne" placeholder="Password" value={passwordOne} onChange={this.notifyChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">

        </Form.Group>
        <Form.Group className="passwordconfirm" controlId="formBasicPassword" style={styles}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="passwordTwo" placeholder="Password" value={passwordTwo} onChange={this.notifyChange} />
        </Form.Group>

        <Form.Group className="check" controlId="formBasicCheckbox" style={stylesBox}>
          <Form.Check type="checkbox" name="isInstructor" label="Are you an instructor?" placeholder="isInstructor" value="isInstructor" onChange={this.notifyChange} />
        </Form.Group>

        <Button variant="primary" type="submit" name="submitButton" style={styles2} disabled={isInvalid}>
          Submit
        </Button>

    
          <h1 style={{fontSize: "small", marginLeft: "0%",textAlign: 'center'}}>
          <SignInLink />
          </h1>

          {error && <p>{error.message}</p>}

      </Form>
    );
    /*
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

        
      </form>
    );
    */
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP} >Sign Up</Link>
  </p>
);
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase)

export default SignUpPage;

export { SignUpForm, SignUpFormBase, SignUpLink };