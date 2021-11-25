import React from 'react'
import { shallow } from 'enzyme'
import { TicketView } from '../components/Ticket/Ticket'
import 'firebase/firestore';
import firebase from 'firebase/app';

describe('ticket test instructor ', () => {
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
                owned: false
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

describe('ticket test student ', () => {
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
    const componentWrapper = shallow (<TicketViewTest isinstructor={false}/>)
    const instance = componentWrapper.instance()
    const resolveTicketSpy = jest.spyOn(instance,'resolveTicket').mockImplementation(()=>"resolve ticket")
    const editTicketSpy = jest.spyOn(instance,'editTicket').mockImplementation(()=>"edit ticket")

    it('student resolve ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('Button').at(1).simulate('click')
        expect(resolveTicketSpy).toHaveBeenCalled();
    });

    it('student edit ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('Button').at(0).simulate('click')
        expect(resolveTicketSpy).toHaveBeenCalled();
    });
})