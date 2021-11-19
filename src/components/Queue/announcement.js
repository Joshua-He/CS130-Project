import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal} from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

class CreateTicket extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ownerName: this.props.userdata.fullName,
            userId: this.props.userdata.userId,
            description: '',
            isResolved: false,
            ticketId: '',
            queueId: this.props.queueid,
        };
    }    

    notifyChange = event => {
        this.setState({[event.target.name]: event.target.value });
    };

    createTicket = () => {
        const {ownerName, userId, description} = this.state;
        this.props.firebase
        .dbCreateTicket(description, ownerName, userId)
        .then((ticketRef) => {
            this.setState({ticketId: ticketRef.id})
            return ticketRef.id
        })
        .then((ticketId) => {
            return this.props.firebase.dbGetTicket(ticketId).get()
        })
        .then((ticket) => {return ticket.data()})
        .then((ticketData) => {
            console.log(ticketData.createdAt)
            this.props.onHide();
            return this.props.firebase.dbAddTicketToQueue(this.state.ticketId,this.state.queueId, ticketData.createdAt)
        })
        .catch(error => {
            this.setState({ error });
        });
    }
    render(){   
        const {
            description,
            ownerName,
            userId,
            error,
        } = this.state;
        
        const isInvalid =
        description === '' ||
        ownerName === '' ||
        userId === '';

        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            >
            <Modal.Header>
                <Modal.Title>
                Create your ticket
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <label>Submit your question</label> */}
                <input
                    name="description"
                    value={description}
                    onChange={this.notifyChange}
                    type="text"
                    placeholder="Ask your question here..."
                />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={isInvalid} onClick={this.createTicket}>Save</Button>
                <Button onClick={this.props.onHide}>Cancel</Button>
                {error && <p>{error.message}</p>}
            </Modal.Footer>
            </Modal>
        );
    }
}
const CreateTicketPopUp = compose(
    withRouter,
    withFirebase
)(CreateTicket);

export default CreateTicketPopUp;