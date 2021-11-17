import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class CreateQueue extends Component{
    constructor(props) {
        super(props);
        this.state = {
            queueName: '',
        };
    }

    changeQueueName = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    createQueue = () => { 
        let userId = this.props.userData.userId;
        const {queueName} = this.state;
        this.props.firebase
        .dbCreateQueue(userId, queueName)
        .then(() => {
            console.log("queue created succesfully!")
            this.props.onHide();
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    render(){
        const {
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
                    onChange={this.changeQueueName}
                    type="text"
                    placeholder="class name"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.createQueue}>Create</Button>
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

export { CreateQueueButton, CreateQueue };