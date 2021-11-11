import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

class EditTicket extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            userdata: this.props.userdata,
            ticketId: this.props.userticketId,
            ticketData:{},
        }
    }

    componentDidMount() {
        this.props.firebase
            .dbGetTicket(this.state.ticketId)
            .then((ticketInfo) => {
                let ticketData = ticketInfo.data();
                this.setState({ticketData:ticketData});
              })
              .catch(error => {
                this.setState({ error });
              });
    }

    notifyChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    edit = () => {
        const { description, ticketId } = this.state;
        this.props.firebase
            .dbEditTicket(description, ticketId)
            .then(() => {
                console.log("ticket edited")
                this.props.onHide();
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    render() {
        const {
            description,
            error,
        } = this.state.ticketData;

        const isInvalid =
            description === ''

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
                    <Button disabled={isInvalid} onClick={this.edit}>Save</Button>
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