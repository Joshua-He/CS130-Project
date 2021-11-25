import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { ForgetPasswordLink } from '../ForgetPassword';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

const SignInPage = (props) => (
  <div id="signInWrapper" className="bg-light">
    <Container>
    <Row>
      <Col className="align-self-center">
        <Row><h1 className="text-center"> Welcome to Kyoo!</h1></Row>
      </Col>
      <Col>
        <Row>
        <h2 className="text-center">Sign In</h2>
        </Row>
        <Row><SignInForm /></Row>
        <Row>
        <SignUpLink/>
        <ForgetPasswordLink />
        </Row>
      </Col>
    </Row>
    </Container>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  signin = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        //login successfully
        this.setState({ ...INITIAL_STATE });
        this.props.history.push({ pathname: ROUTES.USER_PAGE, state: { userId: authUser.user.uid } });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  notifyUpdate = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={this.signin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={this.notifyUpdate} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={this.notifyUpdate} />
        </Form.Group>
        <div className="d-grid gap-2">
        <Button name="submitButton" variant="primary" type="submit">
          Sign In
        </Button>
        </div>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign in</Link>
  </p>
);

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInFormBase, SignInLink, Form };