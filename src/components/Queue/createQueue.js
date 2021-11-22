import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateQueue extends Component{
    constructor(props) {
        super(props);
        this.state = {
            queueName: '',
            description: '',
            announcement:'',
            queueLocation:'',
            queueVLocation:'',
            queueStartTime:'',
            queueEndTime:'',
        };
    }

    componentDidMount() {
        if (this.props.queueId) {
            console.log("inside mount");
            console.log(this.props.queueId);
            this.props.firebase
        .dbGetQueue(this.props.queueId)
        .onSnapshot((snapShot) => {
            let queueData = snapShot.data();
            this.setState(
                {queueName: queueData.name,
                description: queueData.description,
                announcement: queueData.announcement,
                queueLocation: queueData.location,
                queueVLocation: queueData.vLocation,
                queueStartTime: queueData.startTime,
                queueEndTime: queueData.endTime,
            }
            );
            console.log("queue name is ",queueData)
        })
        }
    }

    changeQueueInformation = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    createQueue = () => { 
        let userId = this.props.userData.userId;
        const {
            queueName,
            description,
            announcement,
            queueLocation,
            queueVLocation,
            queueStartTime,
            queueEndTime,
        } = this.state; 
        this.props.firebase
        .dbCreateQueue(userId, queueName, description,announcement, 
            queueLocation, queueVLocation, queueStartTime, queueEndTime)
        .then(() => {
            console.log("queue created succesfully!")
            this.props.onHide();
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    editQueue = () => {
        const {
            queueName,
            description,
            announcement,
            queueLocation,
            queueVLocation,
            queueStartTime,
            queueEndTime,
        } = this.state; 
        this.props.firebase
        .dbEditQueue(this.props.queueId, queueName, description,announcement, queueLocation, queueVLocation, queueStartTime, queueEndTime)
        .then(() => {
            console.log("queue saved succesfully!")
            this.props.onHide();
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    render(){
        let title;
        let onSave;
        const {
            queueName,
            description,
            announcement,
            queueLocation,
            queueVLocation,
            queueStartTime,
            queueEndTime,
        } = this.state;
        if (!this.props.queueId) {
            title = "Create New Office Hour Queue";
            onSave = this.createQueue;
        }
        else {
            title = "Edit Office Hour Queue";
            onSave = this.editQueue;
        }

        return (
             <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            >
            <Modal.Header>
                <Modal.Title>
                {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label> Class Name </label><br/>
                <input
                    name="queueName"
                    value={queueName}
                    onChange={this.changeQueueInformation}
                    type="text"
                    placeholder={this.state.queueName}
                /><br/>
                <label> Description </label><br/>
                <input
                    name="description"
                    value={description}
                    onChange={this.changeQueueInformation}
                    type="text"
                /><br/>
                <label> Location </label><br/> 
                <input
                    name="queueLocation"
                    value={queueLocation}
                    onChange={this.changeQueueInformation}
                    type="text"
                /><br/>
                <label> Virtual location </label><br/> 
                <input
                    name="queueVLocation"
                    value={queueVLocation}
                    onChange={this.changeQueueInformation} 
                    type="text"
                /><br/>
                <label> Start time </label><br/> 
                <input
                    name="queueStartTime"
                    value={queueStartTime}
                    type="time"
                    min="08:00" max="21:00"
                    onChange={this.changeQueueInformation} 
                /><br/>
                <label> End time </label><br/> 
                <input
                    name="queueEndTime"
                    value={queueEndTime}
                    type="time"
                    min="08:00" max="21:00"
                    onChange={this.changeQueueInformation} 
                />
               
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSave}>Save</Button>
                <Button onClick={this.props.onHide}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}
const CreateQueuePopUp = compose(
    withRouter,
    withFirebase
)(CreateQueue);

export { CreateQueuePopUp, CreateQueue };