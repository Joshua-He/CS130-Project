import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class CreateQueue extends Component{
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
        };
    }

    onClick = () => { 
        let userId = this.props.userData.userId;
        this.setState({uid: userId});
        this.props.firebase.doCreateQueue(userId);
    }

    render(){
        let isInstructor = this.props.userData.isInstructor;
        let button;
        if (isInstructor) {
            button = <button type="submit" onClick={this.onClick}>
            Create Queue {this.state.uid}
            </button>
        }
        else {
            button = null;
        }

        return (
            button
        )
    }
}
const CreateQueueButton = compose(
    withRouter,
    withFirebase
)(CreateQueue);

export { CreateQueueButton };