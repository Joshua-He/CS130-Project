import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class JoinQueue extends Component{
    constructor(props) {
        super(props);
        this.state = {
            queueToken: '',
        };
    }

    changeQueueInformation = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    joinQueue = () => { 
        let userId = this.props.userData.userId;
        const {
            queueToken
        } = this.state; 
        console.log(queueToken);

        this.props.firebase.dbExistQueue(queueToken);

        /*
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
        */
    }

    render(){
        const {
            queueToken,
        } = this.state;
        
        return (
             <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            >
            <Modal.Header>
                <Modal.Title>
                Join an office hour queue
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label> Class token </label><br/>
                <input
                    name="queueToken"
                    value={queueToken}
                    onChange={this.changeQueueInformation}
                    type="text"
                /><br/>
                
               
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.joinQueue}>Join</Button>
                <Button onClick={this.props.onHide}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}
const JoinQueuePopUp = compose(
    withRouter,
    withFirebase
)(JoinQueue);

export { JoinQueuePopUp, JoinQueue };