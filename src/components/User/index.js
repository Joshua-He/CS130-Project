import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { SignOutButton } from '../SignOut';
import { CreateQueueButton } from '../QueueManagement';
import * as ROUTES from '../../constants/routes';
import Queues from '../Queue/queueList';
import UpdateUserInfoPopUp from './updateUserInfo';
import CreateTicketPopUp from '../Ticket/createTicket';

const UserPage = (props) => (
  <div>
    <User userdata={props.location.state.userData}/>
  </div>
);

// TODO: use isInstructor to display component
class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateUserInfo: false,
      userData: this.props.userdata, 
      createQueue: false,
      addTicket: false,
    };
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
    return (
      <div>
        <h1> Hello, {this.state.userData.fullName}</h1>
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
