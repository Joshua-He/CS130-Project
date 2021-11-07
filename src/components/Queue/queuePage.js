import React, { Component } from 'react';
import Queue from './queue';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Button from 'react-bootstrap/Button';

const QueuePage = (props) => (
    <div>
      <h1>Queue Page</h1>
      <QueueTicketLists/>
    </div>
  );

  
class QueueWithTickets extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
  }
  onClick = () => {
    console.log("enter queue: ",this.state.userData)
    this.props.history.push({ pathname: ROUTES.USER_PAGE, state: {userData: this.state.userData}});
  }
  render() {
    console.log("queue ids inside queueList",this.state);
    return (
        <div>
         {/* <div>{this.queueData.tickets.map((ticketId) => <Ticket ticketId={ticketId}/>)}</div> */}
        <Button variant="primary" onClick={this.onClick}>
            Go back to main page
        </Button>
        </div>
        
    );
  }

}

const QueueTicketLists = compose(
  withRouter,
  withFirebase
)(QueueWithTickets);

export default QueuePage;