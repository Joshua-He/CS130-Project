import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {Button, Card, Col}from 'react-bootstrap';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { CreateQueuePopUp } from '../Queue/createQueue';
import QueueLocation from '../Queue/queueMap';

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
    this.props.firebase.dbDeactivateQueue(this.state.queueId)
    .then(() => {
      let queueData = this.state.queueData;
      queueData.isDeleted = true;
      this.setState({queueData: queueData})
    })
  }

  reactivateQueue = () => {
    this.props.firebase.dbReactivateQueue(this.state.queueId)
    .then(() => {
      let queueData = this.state.queueData;
      queueData.isDeleted = false;
      this.setState({queueData: queueData})
    })
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
    if (queueData) {
      if (!queueData.location){
        queueData.location = queueData.vLocation
      }
      queue =  
      <Col>
        <Card className="p-3" style={{ width: '22rem' }}>
          <Card.Body>
            <QueueLocation lat={queueData.lat} lng={queueData.lng} location={queueData.location}/>
            <Card.Title>{queueData.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{"ID: " + this.state.queueId}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{queueData.startTime + ' - ' + queueData.endTime}</Card.Subtitle>
            <Card.Text>{queueData.description}</Card.Text>
            <div className="d-grid gap-1">
           
            {
              !queueData.isDeleted&&
              <Button variant="primary" disabled={queueData.isDeleted} onClick={this.enterQueue}>
                enter
              </Button> 
            }
            {
              this.state.userData.isInstructor && 
              <Button onClick={this.toggleEditQueue} >
                Edit queue
              </Button>
            }   
            {
              userData.isInstructor && !queueData.isDeleted &&
              <Button variant="danger" onClick={this.deactivateQueue}>
                deactivate
              </Button> 
            }
            {
              userData.isInstructor && queueData.isDeleted && 
              <Button variant="primary"  onClick={this.reactivateQueue}>
                reactivate
              </Button> 
            }
            </div>
            <CreateQueuePopUp 
            show={this.state.editQueue} userData={this.state.userData} 
            onHide={this.toggleEditQueue}
            queueId = {this.state.queueId}/>
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