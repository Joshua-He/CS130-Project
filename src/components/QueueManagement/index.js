import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class CreateQueue extends Component{
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
        };
    }

    onClick = () => { 
        this.setState({uid: this.props.uid});
    }

    render(){
        
        return (
            <button type="submit" onClick={this.onClick}>
            Create Queue {this.state.uid}
            </button>
        )
    }
}
const CreateQueueButton = compose(
    withRouter,
    withFirebase
)(CreateQueue);

export { CreateQueueButton };