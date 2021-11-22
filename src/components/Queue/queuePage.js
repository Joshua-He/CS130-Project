import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Ticket from '../Ticket/Ticket';
import CreateTicketPopUp from '../Ticket/createTicket';
import EditTicketPopUp from '../Ticket/editTicket';
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
    
    console.log("queuepage state", this.state)
    let ticketLength = 0;
    if(this.state.userData.tickets){
      ticketLength = this.state.userData.tickets.length;
    }
    for (let i = 0; i < ticketLength; i++){
        if (Object.keys(this.state.queueData.tickets).includes(this.state.userData.tickets[i])){
            this.setState({addTicket:false,editTicket:false, createdTicket: true, userTicketId: this.state.userData.tickets[i]})
            return
        }
    }
    this.setState({createdTicket: false, addTicket:false,editTicket:false})
  }

  sortTimestamp = (keys) => {
      return keys.sort((k1,k2) => this.state.queueData.tickets[k1]['seconds'] - this.state.queueData.tickets[k2]['seconds'])
  }
  
  addTicket = () => {
    this.setState({addTicket:!this.state.addTicket})
  }

  editTicket = () => {
    this.setState({editTicket:!this.state.editTicket})
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
                this.state.createdTicket
                ?  <Button onClick={this.editTicket}>Edit ticket</Button> 
                :  <Button onClick={this.addTicket}>Add ticket</Button> 
              }
              <Button variant="primary" onClick={this.backToMain}>
                Go back to main page
              </Button>
            </Nav>
            </Container>
          </Navbar>

          <h1 className="text-center"> {this.state.queueData && this.state.queueData.name}</h1>
          <div>
          {orderedTicketIds && 
            <Row md={1} className="justify-content-center g-3">
              {orderedTicketIds.map((ticketId) => <Ticket ticketid={ticketId}/>)}
            </Row>}
          </div>
          {/* <EditTicketPopUp userticketid={this.state.userTicketId} queueid={this.state.queueId} userdata={this.state.userData}/>  */}
          <CreateTicketPopUp onHide={this.addTicket} show={this.state.addTicket} queueid={this.state.queueId} userdata={this.state.userData}/> 
        </div>
    );
  }

}

const QueueTicketLists = compose(
  withRouter,
  withFirebase
)(QueueWithTickets);

export default QueuePage;