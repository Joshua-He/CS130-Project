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
            userData: this.props.userdata,
            ticketId: this.props.userticketId,
        }
    }    

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    update = () => {
        const {description, fullName, userId} = this.state;
        this.props.firebase
        .dbCreateTicket(description, fullName, userId)
        // .then (() => {
            
        // })
        .then(() => {
            console.log("ticket created")
            this.props.onHide();
        })
        .catch(error => {
            this.setState({ error });
        });
    }
    render(){   
        const {
            description,
            fullName,
            userId,
            error,
        } = this.state;
        
        const isInvalid =
        description === '' ||
        fullName === '' ||
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
                    onChange={this.onChange}
                    type="text"
                    placeholder="Ask your question here..."
                />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={isInvalid} onClick={this.update}>Save</Button>
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