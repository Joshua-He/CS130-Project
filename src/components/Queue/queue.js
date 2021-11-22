import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {Button, Card, Col}from 'react-bootstrap';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import EdiText from 'react-editext';

class QueueDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        queueId: this.props.queueid,
        ticketCreated: false,
        userData: this.props.userdata,
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

  render() {
    const {
      queueId,
      queueData,
      error,
    } = this.state;
    let queue;
    if (queueData) {
      queue =  
      <Col>
        <Card className="p-3" style={{ width: '22rem' }}>
          <Card.Body>
            <Card.Title>{queueData.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{queueData.startTime + ' - ' + queueData.endTime}</Card.Subtitle>
            <EdiText
              type="text"
              viewProps={{
                className: 'react-answer-1',
                style: { borderRadius: 3 }
              }}
              value={queueData.description}
              onSave={this.onEdit}
              editButtonContent="Edit"
            />
            <Button variant="primary" disabled={queueData.isDeleted} onClick={this.enterQueue}>
              enter
            </Button> 
            <Button variant="danger" disabled={queueData.isDeleted} onClick={this.deactivateQueue}>
              deactivate
            </Button> 
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