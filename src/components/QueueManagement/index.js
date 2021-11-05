import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal} from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

class CreateQueue extends Component{
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            show: true, // if the popup should appear
        };
    }

    onHide = () => {
        this.setState({show:!this.state.show})
      }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    onClick = () => { 
        let userId = this.props.userData.userId;
        this.setState({uid: userId});
        this.props.firebase.doCreateQueue(userId);
    }

    render(){
        // let isInstructor = this.props.userData.isInstructor;
        // let button;
        // if (isInstructor) {
        //     button = <button type="submit" onClick={this.onClick}>
        //     Create Queue {this.state.uid}
        //     </button>
        // }
        // else {
        //     button = null;
        // }

        // return (
        //     button
        // )
        return (
            <Modal show={this.props.show}
            onHide={this.props.onHide}>
                Pop
            </Modal>
        )
    }
}
const CreateQueueButton = compose(
    withRouter,
    withFirebase
)(CreateQueue);

export { CreateQueueButton };