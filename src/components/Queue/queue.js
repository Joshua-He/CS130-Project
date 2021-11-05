import React, { Component } from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

const Queue = () => (
  <div>
    <Queue/>
  </div>
);

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
        queueId: this.props.queueid,
        ticketId: this.props.ticketid,
    };
  }

  componentDidMount(){
    this.props.firebase
    .dbGetQueue(this.state.queueId)
    .onSnapShot((snapShot) => {
        console.log('In Queue onSnapshot Called!');
        let data = snapShot.docs.map(doc => doc.data());
        this.setState({queueData: data});
    })
    .catch(error => {
        this.setState({ error });
    });
  }

  render() {
    const {
      queueId,
      ticketId,
    } = this.state;
    return (
        <div>
            {queueId}
            <div>{this.queueData.tickets.map((ticketId) => <Ticket ticketId={ticketId}/>)}</div>
            {error && <p>{error.message}</p>}
        </div>
    );
  }

}
export { Queue };