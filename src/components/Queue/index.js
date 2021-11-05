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
    this.state = this.props.userdata;
  }

  render() {
    const {
      ticketsMap,
      error,
    } = this.state;
    return (
      <div>{ticketsMap.map((queueId, ticketId) => <Queue queueid={queueId} ticketid={ticketId}/>)}</div>
    );
  }

}
export { QueueList };