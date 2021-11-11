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


const SignInPage = (props) => (
  <div>
    <h1 style={{fontFamily: 'arial', textAlign: 'center', color: "#00005c", margin: "3.4%", }}>Sign In</h1>
    <SignInForm />
    <h1 style={{fontSize: "small", marginLeft: "0%",textAlign: 'center'}}>
      <SignUpLink
      />
      <ForgetPasswordLink />
    </h1>

    
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

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        //login successfully
        this.setState({ ...INITIAL_STATE });
        // return this.props.firebase.dbGetUserInfo(authUser.user.uid)
        // .onSnapshot((snapShot) => {
        //   let userData = snapShot.data();
        //   this.props.history.push({ pathname: ROUTES.USER_PAGE, state: { userData } }); 
        // })
        this.props.history.push({ pathname: ROUTES.USER_PAGE, state: {userId: authUser.user.uid }});
      })
      // .then((userInfo) => {
      //   let userData = userInfo.data();
      //   this.props.history.push({ pathname: ROUTES.USER_PAGE, state: { userData } });
      // })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    let styles = {
      marginRight: '300px',
      marginLeft: '25%',
      marginBottom: '2%',
      width: '50%'
    }

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={styles}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={this.onChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" style={styles}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={this.onChange} />
        </Form.Group>


        <Button name="submitButton" variant="primary" type="submit" style={styles}>
          Sign In
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInLink = () => (
  <p >
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign in</Link>
  </p>
);

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInFormBase, SignInLink, Form};