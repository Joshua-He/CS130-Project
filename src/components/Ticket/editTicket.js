import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class EditTicket extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            description:this.props.ticketdata.description,
            ticketId:this.props.ticketid,
            error: null,
            title: this.props.ticketdata.title,
        }
    }

    notifyChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    edit = () => {
        const { description, ticketId, title } = this.state;
        this.props.firebase
            .dbEditTicket(description, ticketId)
            .then(() => {
                console.log("ticket edited")
                this.props.editticket(title,description);
                this.props.onHide();
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    render() {
        const {
            title,
            description,
            error,
        } = this.state

        const isInvalid =
            description === '' || title === ''

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header>
                    <Modal.Title>
                        Edit your ticket
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
                    <Button name="editButton" disabled={isInvalid} onClick={this.edit}>Save</Button>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    {error && <p>{error.message}</p>}
                </Modal.Footer>
            </Modal>
        );
    }
}
const EditTicketPopUp = compose(
    withRouter,
    withFirebase
)(EditTicket);

export default EditTicketPopUp;
export {EditTicket};