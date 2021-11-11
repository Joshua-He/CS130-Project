import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { SignOutButton } from '../SignOut';
<<<<<<< HEAD
import { CreateQueueButton } from '../Queue/createQueue';
import * as ROUTES from '../../constants/routes';
=======
import { CreateQueueButton } from '../QueueManagement';
>>>>>>> 8643df1 (fix library to make sure the test runs properly)
import Queues from '../Queue/queueList';
import UpdateUserInfoPopUp from './updateUserInfo';

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
  
  createQueueSwitch = () => {
    this.setState(
      {createQueue:!this.state.createQueue}
    )
  }

  updateUserInfo = () => {
    this.setState({updateUserInfo:!this.state.updateUserInfo})
  }

  isInstructor = () => {
    if (this.state.userData.isInstructor === true) {
      return (
        <button onClick={this.createQueueSwitch}>Create queue</button>
      );
    }
    return null;
  }
  
  render() {
    if (this.state.isLoading){
      return null
    }
    return (
      <div>
        <h1> Hello, {this.state.userData && this.state.userData.fullName}</h1>
        <button onClick={this.updateUserInfo}>Update info</button>
        <UpdateUserInfoPopUp 
        show={this.state.updateUserInfo} updatedata={this.updateData} userdata={this.state.userData}
        onHide={this.updateUserInfo}
        />
        <Queues userdata={this.state.userData}/>
        
        <SignOutButton/>
        {this.isInstructor()}
        <CreateQueueButton userData={this.state.userData} show={this.state.createQueue} onHide={this.createQueueSwitch}/>
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
