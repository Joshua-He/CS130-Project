import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import {Button, Card, Col}from 'react-bootstrap';
import EditTicketPopUp from '../Ticket/editTicket';

class TicketView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketId: this.props.ticketid,
            owned: false,
            editTicket: false,
        };
    }

    componentDidMount() {
        console.log("component did mount")
        this.props.firebase
            .dbGetTicket(this.state.ticketId)
            .onSnapshot((snapShot) => {
                let ticketData = snapShot.data()
                this.setState({ ticketData:ticketData});
                if (ticketData && ticketData.userId == this.props.userid && !ticketData.isResolved){
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

    updateTicketData = (description) => {
        let ticketData = this.state.ticketData;
        if(ticketData){
            ticketData.description = description
            this.setState({
                ticketData: ticketData
            })
        }
    }
    editTicket = () => {
        this.setState({
            editTicket : !this.state.editTicket
        })
    }

    render() {
        const {
            ticketData,
            owned
        } = this.state
        let ticket;
        console.log("ticket info", this.state)
        if (ticketData && !ticketData.isResolved) {
            ticket = 
            <Col>
                <Card className="p-3 mx-auto" style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>{ticketData.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"created by: "+ ticketData.ownerName}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{"created at: "+ ticketData.createdAt.toDate().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})}</Card.Subtitle>
                    <Card.Text>
                    {ticketData.description}
                    </Card.Text>
                    <div className="d-grid gap-2">
                    {
                    owned&&!this.props.isinstructor&&
                    <Button variant="primary" onClick={this.editTicket}>
                    edit
                    </Button>
                    }
                    {
                    this.props.isinstructor&&
                    <Button variant="danger" onClick={this.resolveTicket}>
                    resolve
                    </Button>
                    } 
                    {
                    owned&&!this.props.isinstructor&&
                    <Button variant="danger" onClick={this.resolveTicket}>
                    resolve
                    </Button>
                    }
                    </div>
                    <EditTicketPopUp onHide={this.editTicket} show={this.state.editTicket}
                     ticketdata={ticketData} ticketid={this.state.ticketId} editticket={this.updateTicketData}/> 
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
export { TicketView, Ticket };