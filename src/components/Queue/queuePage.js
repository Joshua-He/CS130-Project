import React, { Component } from 'react';
import Queue from './queue';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Button from 'react-bootstrap/Button';
import Ticket from '../Ticket/Ticket';
import CreateTicketPopUp from '../Ticket/createTicket';
import EditTicketPopUp from '../Ticket/editTicket';

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

  componentDidMount() {
    this.props.firebase
    .dbGetQueue(this.state.queueId)
    .onSnapshot((snapShot) => {
        console.log('In Queue onSnapshot Called!');
        let data = snapShot.data();
        this.setState({queueData: data});
    })
    
    console.log("queuepage state", this.state)
    for (let i = 0; i < this.state.userData.tickets.length; i++){
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
    this.props.history.push({ pathname: ROUTES.USER_PAGE, state: {userData: this.state.userData}});
  }
  render() {
    console.log("queue ids inside queueList",this.state.queueData);
    const queueData = this.state.queueData;
    let orderedTicketIds = this.sortTimestamp(Object.keys(queueData.tickets))
    console.log("orderedTicketIds",orderedTicketIds);
    return (
        <div>
            <div>{orderedTicketIds && orderedTicketIds.map((ticketId) => <Ticket ticketid={ticketId}/>)}</div>
            
            <div>
                {
                this.state.createdTicket
                ?  <Button onClick={this.editTicket}>Edit ticket</Button> 
                :  <Button onClick={this.addTicket}>Add ticket</Button> }
            </div>
            <div>
            {
                this.state.createdTicket
                ?  <EditTicketPopUp userticketid={this.state.userTicketId} queueid={this.state.queueId} userdata={this.state.userData}/> 
                :  <CreateTicketPopUp onHide={this.addTicket} show={this.state.addTicket} queueid={this.state.queueId} userdata={this.state.userData}/> }
            </div>
            <Button variant="primary" onClick={this.resolveTicket}>
                Resolve ticket
            </Button><br/>
        
            <Button variant="primary" onClick={this.backToMain}>
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