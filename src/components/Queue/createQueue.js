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
            description: '',
            announcement:'',
            queueLocation:'',
            queueVLocation:'',
            queueStartTime:'',
            queueEndTime:'',
        };
    }

    changeQueueInformation = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    createQueue = () => { 
        let userId = this.props.userData.userId;
        const {
            queueName,
            description,
            announcement,
            queueLocation,
            queueVLocation,
            queueStartTime,
            queueEndTime,
        } = this.state; 
        this.props.firebase
        .dbCreateQueue(userId, queueName, description,announcement, 
            queueLocation, queueVLocation, queueStartTime, queueEndTime)
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
            description,
            announcement,
            queueLocation,
            queueVLocation,
            queueStartTime,
            queueEndTime,
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
                <label> Class Name </label><br/>
                <input
                    name="queueName"
                    value={queueName}
                    onChange={this.changeQueueInformation}
                    type="text"
                /><br/>
                <label> Description </label><br/>
                <input
                    name="description"
                    value={description}
                    onChange={this.changeQueueInformation}
                    type="text"
                /><br/>
                <label> Location </label><br/> 
                <input
                    name="queueLocation"
                    value={queueLocation}
                    onChange={this.changeQueueInformation}
                    type="text"
                /><br/>
                <label> Virtual location </label><br/> 
                <input
                    name="queueVLocation"
                    value={queueVLocation}
                    onChange={this.changeQueueInformation} 
                    type="text"
                /><br/>
                <label> Start time </label><br/> 
                <input
                    name="queueStartTime"
                    value={queueStartTime}
                    type="time"
                    min="08:00" max="21:00"
                    onChange={this.changeQueueInformation} 
                /><br/>
                <label> End time </label><br/> 
                <input
                    name="queueEndTime"
                    value={queueEndTime}
                    type="time"
                    min="08:00" max="21:00"
                    onChange={this.changeQueueInformation} 
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