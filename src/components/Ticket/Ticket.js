import React, { Component } from 'react';


class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = { ticketId: this.props.ticketId, ticketData:{} };
    }

    componentDidMount() {
        this.props.firebase
            .dbGetTicket(this.state.ticketId)
            .onSnapShot((snapShot) => {
                console.log("In Ticket onSnapshot called!")
                let data = snapShot.docs.map(doc => doc.data());
                this.setState({ ticketData:data });
            })
    }

    render() {
        const {ticketData} = this.state
        return (
            <div>
               {ticketData && 
               <div>ticketData.fullName</div> &&
               <div>ticketData.description</div>}
            </div>
        );
    }

}

export default Ticket;