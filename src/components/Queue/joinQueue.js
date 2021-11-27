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
            existQueue: true,
        };
    }

    changeQueueInformation = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    clearText = () => {
        this.setState({
            queueToken: '',
            existQueue: true,
        });
        this.props.onHide();

    }

    joinQueue = () => { 
        let userId = this.props.userData.userId;
        const {
            queueToken
        } = this.state; 
        const token = queueToken.trim();

        this.props.firebase
        .dbExistQueue(token)
        .then((queueExists) => {
            if (queueExists) {
                this.props.firebase
                .dbJoinQueue(userId, token)
                .then(() => {
                    console.log("join queue succesfully!")
                    this.setState({
                        queueToken: '',
                        existQueue: true,
                    });
                    this.props.onHide();
                })
            }
            else {
                this.setState({existQueue: queueExists})
            }
            
        })
    }

    render(){
        const {
            queueToken,
            existQueue,
        } = this.state;

        const isInvalid = queueToken === '';

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
                {existQueue? 
                null :
                <div><label> Class token does not exist! Check token </label><br/></div>}
            </Modal.Body>
            <Modal.Footer>
                <Button name="joinButton" disabled={isInvalid} onClick={this.joinQueue}>Join</Button>
                <Button onClick={
                    this.clearText
                    }>Cancel</Button>
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