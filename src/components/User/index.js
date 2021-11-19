import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { SignOutButton } from '../SignOut';
import { CreateQueuePopUp } from '../Queue/createQueue';
import Queues from '../Queue/queueList';
import UpdateUserInfoPopUp from './updateUserInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Button, Row, Col} from 'react-bootstrap'
import * as ROUTES from '../../constants/routes';

const UserPage = (props) => (
  <div>
  <User userId={props.location.state.userId}/>
  </div>
);

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateUserInfo: false,
      userData: {}, 
      isLoading: true,
      createQueue: false,
      addTicket: false,
    };
  }

  componentDidMount(){
    this.props.firebase
    .dbGetUserInfo(this.props.userId)
    .onSnapshot((snapShot) => {
        let data = snapShot.data();
        this.setState({userData: data, isLoading: false});
        console.log("current state",this.state)
    })
  }
  
  updateData = (fullName, IsIntructor) => {
    let updatedUserData = this.state.userData;
    updatedUserData.fullName = fullName;
    updatedUserData.IsIntructor = IsIntructor;
    this.setState({userData: updatedUserData});
  }
  
  createQueue = () => {
    this.setState({createQueue:!this.state.createQueue})
  }

  updateUserInfo = () => {
    this.setState({updateUserInfo:!this.state.updateUserInfo})
  }
  
  render() {
    if (this.state.isLoading){
      return null
    }
    return (
      <div>
        <Navbar fix="top" bg="primary" variant="dark">
          <Container>
          <Navbar.Brand>Kyoo</Navbar.Brand>
          <Nav className="me-auto">
            {this.state.userData && this.state.userData.isInstructor === true?  <Button onClick={this.createQueue}>Create queue</Button> : null}
            <Button onClick={this.updateUserInfo}>Update info</Button>
            <SignOutButton/>
          </Nav>
          </Container>
        </Navbar>
        <Container>
          <Row><h1 className="text-center"> Hello, {this.state.userData && this.state.userData.fullName}</h1></Row>
          <Row><Queues userdata={this.state.userData}/> </Row>
        </Container>
    
        <UpdateUserInfoPopUp 
        show={this.state.updateUserInfo} updatedata={this.updateData} userdata={this.state.userData}
        onHide={this.updateUserInfo}
        />
        <CreateQueuePopUp 
        show={this.state.createQueue} userData={this.state.userData} 
        onHide={this.createQueue}/>
      </div>
    )
  }
}


const User = compose(
  withRouter,
  withFirebase,
)(UserView);

export default UserPage;
export {User};
