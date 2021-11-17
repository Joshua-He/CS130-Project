import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Button from 'react-bootstrap/Button';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

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

  render() {
    const {
      queueId,
      queueData,
      error,
    } = this.state;
    let queue;
    if (queueData) {
      queue =  <div>
      Name: {queueData.name} <br/>
      Description: {queueData.description}<br/>
      Start Time: {queueData.startTime}<br/>
      End Time: {queueData.endTime}<br/>
      <Button variant="primary" onClick={this.enterQueue}>
         enter this queue
      </Button>
      </div>;
    } else{
      queue = <div></div>;
    }
    return (
      <div>
        {queue}
        {error && <p>{error.message}</p>}
      </div>
     
       
    );
  }

}

const Queue = compose(
    withRouter,
    withFirebase
)(QueueDashboard);

export default Queue;