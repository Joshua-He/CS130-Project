import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { SignInLink } from '../SignIn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

const SignUpPage = (props) => (
  <div id="signUpWrapper" className="bg-light">
  <Container>
  <Row>
    <Col className="align-self-center">
      <Row><h1 class="text-center"> Welcome to Kyoo!</h1></Row>
    </Col>
    <Col>
      <Row>
      <h2 class="text-center">Sign Up</h2>
      </Row>
      <Row><SignUpForm /></Row>
    </Col>
  </Row>
  </Container>
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

  checkIsInstructor = () => {
    this.setState({isInstructor: !this.state.isInstructor}, () => {
      console.log(this.state)
    });
  }

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

      <Form onSubmit={this.signup}>
        <Form.Group className="first mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="name" name="fullName" placeholder="Enter name" value={fullName} onChange={this.notifyChange} />
        </Form.Group>
        <Form.Group className="email mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={this.notifyChange} />
        </Form.Group>

        <Form.Group className="password mb-3" controlId="formBasicPassword" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="passwordOne" placeholder="Password" value={passwordOne} onChange={this.notifyChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">

        </Form.Group>
        <Form.Group className="passwordconfirm" controlId="formBasicPassword" >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="passwordTwo" placeholder="Password" value={passwordTwo} onChange={this.notifyChange} />
        </Form.Group>
        <Form.Group className="check" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" name="isInstructor" label="Are you an instructor?" checked={this.state.isInstructor} onChange={this.checkIsInstructor} />
        </Form.Group>

        <div className="d-grid gap-2">
        <Button variant="primary" type="submit" name="submitButton" disabled={isInvalid}>
          Submit
        </Button>
        </div>

        <SignInLink />

          {error && <p>{error.message}</p>}

      </Form>
    );
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