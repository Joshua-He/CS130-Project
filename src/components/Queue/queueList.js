import React, { Component } from 'react';
import Queue from './queue';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Row } from 'react-bootstrap';


class QueueList extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.userdata;
  }

  render() {
    console.log("queue ids inside queueList",this.state);
    return (
        <div>
        {this.state.queues && <Row md={3}>{this.state.queues.map((queueId) => <Queue queueid={queueId} userdata={this.state}/>)}</Row>}
        </div>
    );
  }

}

const Queues = compose(
  withRouter,
  withFirebase
)(QueueList);

export default Queues;