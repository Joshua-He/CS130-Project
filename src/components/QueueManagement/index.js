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
            show: true, // if the popup should appear,
            queueName: '',
        };
    }


    onHide = () => {
        this.setState({show:!this.state.show})
      }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    update = () => { 
        let userId = this.props.userData.userId;
        const {show, queueName} = this.state;
        this.props.firebase.doCreateQueue(userId, queueName);
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

        const {
            uid,
            show,
            queueName,
        } = this.state;
        
        return (
             <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            >
            <Modal.Header>
                <Modal.Title>
                Create New Office Hour Queue
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    name="queueName"
                    value={queueName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="class name"
                />
                
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.update}>Create</Button>
                <Button onClick={this.props.onHide}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}
const CreateQueueButton = compose(
    withRouter,
    withFirebase
)(CreateQueue);

export { CreateQueueButton };