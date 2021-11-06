import React, { Component } from 'react';
import {Queue} from './queue';

const QueueList = () => (
  <div>
    <QueueList/>
  </div>
);

class QueueList extends Component {
  constructor(props) {
    super(props);
    this.state = {"userdata":this.props.userdata};
  }

  render() {
    return (
      <div>{ticketsMap.map((queueId, ticketId) => <Queue queueid={queueId} ticketid={ticketId} userdata={this.state.userdata}/>)}</div>
    );
  }

}
export { QueueList };