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

  useEffect(() => {
    const tickets = 
      .collection('')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);

  render() {
    const {
      queueId,
      ticketId,
    } = this.state;
    return (
        
    );
  }

}
export { Queue };