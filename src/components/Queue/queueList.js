import React, { Component } from 'react';
import Queue from './queue';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class QueueList extends Component {
  constructor(props) {
    super(props);
    this.state = {"userdata":this.props.userdata};
  }

  render() {
    return (
      <div>{this.state.userdata.queues.map((queueId) => <Queue queueid={queueId} userdata={this.state.userdata}/>)}</div>
    );
  }

}

const Queues = compose(
  withRouter,
  withFirebase
)(QueueList);

export default Queues;