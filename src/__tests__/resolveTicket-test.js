import React from 'react'
import { shallow } from 'enzyme'
import { TicketView, Ticket } from '../components/Ticket/Ticket'
import 'firebase/firestore';
import firebase from 'firebase/app';
import { withFirebase } from '../components/Firebase';
import { compose } from 'recompose';

describe('ticket test ', () => {
    console.log(firebase.firestore.FieldValue.serverTimestamp());
    let TicketViewTest = class extends TicketView {
        componentDidMount() { 
            this.setState({ 
                ticketData: 
                    {createdAt: null,
                    description: "",
                    isResolved: false,
                    ownerName: "Jiaxin",
                    userId: "8vOkiHTn2xTaSFnDoiu7VRwbmUo2"
                }
            })
        }
    }
    const componentWrapper = shallow (<TicketViewTest/>)
    const instance = componentWrapper.instance()
    const resolveTicketSpy = jest.spyOn(instance,'resolveTicket')

    it('instructor resolve ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('Button').simulate('click')
        expect(resolveTicketSpy).toHaveBeenCalled();
    });
})