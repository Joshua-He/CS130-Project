import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Ticket from '../Ticket/Ticket';
import CreateTicketPopUp from '../Ticket/createTicket';
import ChromeDinoGame from 'react-chrome-dino';
import {Container, Nav, Navbar, Button, Row, Col} from 'react-bootstrap'

const QueuePage = (props) => (
    <div>
      <QueueTicketLists/>
    </div>
  );

  
class QueueWithTickets extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
  }

  componentDidMount() {
    this.props.firebase
    .dbGetQueue(this.state.queueId)
    .onSnapshot((snapShot) => {
        console.log('In Queue onSnapshot Called!');
        let data = snapShot.data();
        this.setState({queueData: data});
    })
  }

  sortTimestamp = (keys) => {
      return keys.sort((k1,k2) => this.state.queueData.tickets[k1]['seconds'] - this.state.queueData.tickets[k2]['seconds'])
  }

  ticketCreated = () => {
    this.setState({ticketCreated:true});
  }

  ticketResolved = () => {
    this.setState({ticketCreated:false});
  }

  addTicket = () => {
    this.setState({addTicket:!this.state.addTicket})
  }

  backToMain = () => {
    console.log("enter queue: ",this.state.userData)
    this.props.history.push({ pathname: ROUTES.USER_PAGE, state: {userId: this.state.userData.userId}});
  }
  render() {
    console.log("queue ids inside queueList",this.state.queueData);
    const queueData = this.state.queueData;
    let orderedTicketIds = this.sortTimestamp(Object.keys(queueData.tickets))
    console.log("orderedTicketIds",orderedTicketIds);
    return (
        <div>
          <Navbar className="sticky-top" bg="primary" variant="dark">
            <Container>
            <Navbar.Brand>Kyoo</Navbar.Brand>
            <Nav className="me-auto">
              {
                !this.state.ticketCreated
                &&<Button onClick={this.addTicket}>Add ticket</Button> 
              }
              <Button variant="primary" onClick={this.backToMain}>
                Go back to main page
              </Button>
            </Nav>
            </Container>
          </Navbar>
          <ChromeDinoGame />
          <h1 className="text-center"> {this.state.queueData && this.state.queueData.name}</h1>
          <div>
          {orderedTicketIds && 
            <Row md={1} className="justify-content-center g-3">
              {orderedTicketIds.map((ticketId) => <Ticket ticketcreated={this.ticketCreated} ticketresolved={this.ticketResolved} isinstructor={this.state.userData.isInstructor} userid={this.state.userData.userId} ticketid={ticketId}/>)}
            </Row>}
          </div>
          <CreateTicketPopUp onHide={this.addTicket} 
          show={this.state.addTicket} queueid={this.state.queueId} 
          userdata={this.state.userData} ticketcreated={this.ticketCreated}/> 
        </div>
    );
  }

}

const QueueTicketLists = compose(
  withRouter,
  withFirebase
)(QueueWithTickets);

export default QueuePage;