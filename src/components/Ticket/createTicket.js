import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal, Button} from 'react-bootstrap';

class CreateTicket extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ownerName: this.props.userdata.fullName,
            userId: this.props.userdata.userId,
            description: '',
            isResolved: false,
            title: '',
            ticketId: '',
            queueId: this.props.queueid,
        };
    }    

    notifyChange = event => {
        this.setState({[event.target.name]: event.target.value });
    };

    createTicket = () => {
        const {ownerName, userId, description,title} = this.state;
        this.props.firebase
        .dbCreateTicket(title, description, ownerName, userId)
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
            this.props.ticketcreated();
            this.props.onHide();
            this.props.firebase.dbAddTicketToUser(this.state.ticketId,this.state.userId)
            return this.props.firebase.dbAddTicketToQueue(this.state.ticketId,this.state.queueId, ticketData.createdAt)
        })
        .then(() => {
            this.setState({description: '', title: ''});
        })
        .catch(error => {
            this.setState({ error });
        });
    }
    render(){   
        const {
            title,
            description,
            ownerName,
            userId,
            error,
        } = this.state;
        
        const isInvalid =
        title === ''||
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
                <label> Title </label><br/>
                <input
                    className="form-control form-control-inline"
                    name="title"
                    value={title}
                    onChange={this.notifyChange}
                    type="text"
                /><br/>
                <label> Question </label><br/>
                <input
                    className="form-control form-control-inline"
                    name="description"
                    value={description}
                    onChange={this.notifyChange}
                    type="text"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button name="createButton" disabled={isInvalid} onClick={this.createTicket}>Save</Button>
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
export {CreateTicket};