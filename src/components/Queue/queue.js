import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {Button, Card, Col}from 'react-bootstrap';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import EdiText from 'react-editext';
import { CreateQueuePopUp } from '../Queue/createQueue';

class QueueDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        queueId: this.props.queueid,
        ticketCreated: false,
        userData: this.props.userdata,
        editQueue: false,
    };
  }

  componentDidMount(){
    this.props.firebase
    .dbGetQueue(this.state.queueId)
    .onSnapshot((snapShot) => {
        console.log('In Queue onSnapshot Called!');
        let data = snapShot.data();
        this.setState({queueData: data});
        console.log("queue data",this.state.queueData)
    })
  }

  enterQueue = () => {
    console.log("enter queue: ",this.state.userdata)
    this.props.history.push({pathname: ROUTES.QUEUE + this.state.queueId, state: this.state});
  }

  onEdit = val => {
    return this.props.firebase.dbEditQueueDescription(this.state.queueId, val);
  }

  deactivateQueue = () => {
    console.log("Deactivate queue", this.state.queueId);
    this.props.firebase.dbDeleteQueue(this.state.queueId).then
    (this.setState({queueData: null}));
  }

  toggleEditQueue = () => {
    this.setState({editQueue:!this.state.editQueue})
  }

  render() {
    const {
      queueId,
      queueData,
      error,
      userData
    } = this.state;
    let queue;
    let enableDrop = userData.isInstructor && queueData ? 
    <Button variant="danger" disabled={queueData.isDeleted} onClick={this.deactivateQueue}>
    deactivate
    </Button> : null;
    if (queueData) {
      queue =  
      <Col>
        <Card className="p-3" style={{ width: '22rem' }}>
        <Button variant="primary" disabled={queueData.isDeleted} onClick={this.enterQueue}>
              enter
            </Button> 
          <Card.Body>
            <Card.Title>{queueData.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{queueData.startTime + ' - ' + queueData.endTime}</Card.Subtitle>
            <Card.Text>{queueData.description}</Card.Text>
            
            <Button onClick={this.toggleEditQueue} >
              Edit queue
            </Button>
            <CreateQueuePopUp 
            show={this.state.editQueue} userData={this.state.userData} 
            onHide={this.toggleEditQueue}
            queueId = {this.state.queueId}/>
            {enableDrop}
          </Card.Body>
        </Card>
      </Col>
    } else{
      queue = null;
    }
    return (
      queue
    );
  }

}

const Queue = compose(
    withRouter,
    withFirebase
)(QueueDashboard);

export default Queue;