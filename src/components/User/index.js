import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { SignOutButton } from '../SignOut';
import UpdateUserInfoPopUp from './updateUserInfo';
import { CreateQueueButton } from '../QueueManagement';

const UserPage = (props) => (
  <div>
    <User userData={props.location.state.userData}/>
  </div>
);

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateUserInfo: false,
      userData: this.props.userData, 
    };
  }
  
  updateData = (fullName, IsIntructor) => {
    let updatedUserData = this.state.userData;
    updatedUserData.fullName = fullName;
    updatedUserData.IsIntructor = IsIntructor;
    this.setState({userData: updatedUserData});
  }
  
  updateUserInfo = () => {
    this.setState({updateUserInfo:!this.state.updateUserInfo})
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
        <SignOutButton/>
        <CreateQueueButton uid={this.state.userData.userId}/>
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
