import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class TicketView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketId: this.props.ticketid,
        };
    }

    componentDidMount() {
        this.props.firebase
            .dbGetTicket(this.state.ticketId)
            .onSnapshot((snapShot) => {
                console.log(this.state.ticketId)
                console.log("In Ticket onSnapshot called!",snapShot.data())
                this.setState({ ticketData:snapShot.data()});
            })
    }

    render() {
        return (
            <div>
                <br/>
               {!!this.state.ticketData && !this.state.ticketData.isResolved &&
                <div>
                Ticket created by: {this.state.ticketData.ownerName} 
                <br/>
                Ticket created at: {this.state.ticketData.createdAt.toDate().toUTCString()}
                <br/>
                Description: {this.state.ticketData.description}</div>
               }
            </div>
        );
    }

}

const Ticket = compose(
    withRouter,
    withFirebase
)(TicketView);

export default Ticket;