import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import {Button, Card, Col}from 'react-bootstrap';

class TicketView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketId: this.props.ticketid,
            owned: false,
        };
    }

    componentDidMount() {
        this.props.firebase
            .dbGetTicket(this.state.ticketId)
            .onSnapshot((snapShot) => {
                let ticketData = snapShot.data()
                this.setState({ ticketData:ticketData});
                if (ticketData && ticketData.userId == this.props.userid){
                    this.setState({owned: true})
                    this.props.ticketcreated();
                }
                return
            })
    }

    resolveTicket = () => {
        this.props.firebase.dbDeleteTicket(this.state.ticketId)
        .then(() => {
            this.setState({ticketData: null});
            this.props.ticketresolved();
        })
    }

    render() {
        const {
            ticketData,
            owned
        } = this.state
        let ticket;
        if (ticketData && !ticketData.isResolved) {
            ticket = 
            <Col>
                <Card className="p-3 mx-auto" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>{ticketData.description}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"created by: "+ ticketData.ownerName}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{"created at: "+ ticketData.createdAt.toDate().toUTCString()}</Card.Subtitle>
                    <Card.Text>
                    {ticketData.description}
                    </Card.Text>
                    {
                    owned&&!this.props.isinstructor&&
                    <Button variant="danger" onClick={this.resolveTicket}>
                    resolve this ticket
                    </Button>
                    }
                    {
                    this.props.isinstructor&&
                    <Button variant="danger" onClick={this.resolveTicket}>
                    resolve this ticket
                    </Button>
                    } 
                </Card.Body>
                </Card>
            </Col>
        }
        else {
            ticket = null
        }
        return (
            ticket
        );
    }

}

const Ticket = compose(
    withRouter,
    withFirebase
)(TicketView);

export default Ticket;