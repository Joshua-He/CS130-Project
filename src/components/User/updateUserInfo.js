import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Modal} from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

class UpdateUserInfo extends Component{
    constructor(props) {
        super(props);
        this.state = this.props.userdata;
    }

    notifyChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    update = () => {
        const {userId, fullName, isInstructor} = this.state;
        this.props.firebase
        .dbUpdateUserInfo(userId,fullName,isInstructor)
        .then (() => {
            console.log("information updated correctly")
            this.props.updatedata(fullName,isInstructor);
            this.props.onHide();
        })
        .catch(error => {
            this.setState({ error });
        });
    }
    render(){ 
        const {
            fullName,
            isInstructor,
            error,
        } = this.state;
        
        const isInvalid =
        fullName === '';

        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            >
            <Modal.Header>
                <Modal.Title>
                Update your information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    name="fullName"
                    value={fullName}
                    onChange={this.notifyChange}
                    type="text"
                    placeholder="Full name"
                />
                <label>Are you an instructor?</label>
                <select name="isInstructor" defaultValue={isInstructor}
                    onChange={this.notifyChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={isInvalid} onClick={this.update}>Save</Button>
                <Button onClick={this.props.onHide}>Cancel</Button>
                {error && <p>{error.message}</p>}
            </Modal.Footer>
            </Modal>
        );
    }
}
const UpdateUserInfoPopUp = compose(
    withRouter,
    withFirebase
)(UpdateUserInfo);

export default UpdateUserInfoPopUp;