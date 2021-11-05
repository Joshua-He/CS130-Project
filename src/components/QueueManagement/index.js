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
        this.setState({uid: this.props.userData.userId});
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