import React from 'react'
import { shallow } from 'enzyme'
import { TicketView, Ticket } from '../components/Ticket/Ticket'
import 'firebase/firestore';
import firebase from 'firebase/app';
import { withFirebase } from '../components/Firebase';
import { compose } from 'recompose';

describe('ticket test ', () => {
    let TicketViewTest = class extends TicketView {
        componentDidMount() { 
            this.setState({ 
                ticketData: 
                    {createdAt: firebase.firestore.Timestamp.now(),
                    description: "",
                    isResolved: false,
                    ownerName: "Jiaxin",
                    userId: "8vOkiHTn2xTaSFnDoiu7VRwbmUo2",
                },
                owned: true
            })
        }
    }
    const componentWrapper = shallow (<TicketViewTest isinstructor={true}/>)
    const instance = componentWrapper.instance()
    const resolveTicketSpy = jest.spyOn(instance,'resolveTicket').mockImplementation(()=>"resolve ticket")

    it('instructor resolve ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('Button').simulate('click')
        expect(resolveTicketSpy).toHaveBeenCalled();
    });
})