import React from 'react'
import { shallow } from 'enzyme'
import { TicketView} from '../components/Ticket/Ticket'
import { CreateTicket } from '../components/Ticket/createTicket';
import { EditTicket } from '../components/Ticket/editTicket';
import 'firebase/firestore';
import firebase from 'firebase/app';

describe('ResolveTicket test for instructor ', () => {
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

    it('instructor is able to trigger resolve ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('Button').simulate('click')
        expect(instance.state.ticketData.isResolved === true);
        expect(resolveTicketSpy).toHaveBeenCalled();
    });
})

describe('ResolveTicket tests for student ', () => {
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

    it('student is able to trigger resolveticket for his/her own ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('Button').at(1).simulate('click')
        expect(instance.state.ticketData.isResolved === true);
        expect(resolveTicketSpy).toHaveBeenCalled();
    });
})

describe('CreateTicket test', () => {
    const componentWrapper = shallow (<CreateTicket userdata={{fullName: "ownerName", userId:"123"}} />)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const notifyChangeSpy = jest.spyOn(instance,'notifyChange')
    const CreateTicketSpy = jest.spyOn(instance, 'createTicket').mockImplementation(()=>"create ticket in firebase backend")

    it('if user fill in all required information, user is able to create ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="title"]').simulate('change', {target: {value: "new ticket"}})
        componentWrapper.find('input[name="description"]').simulate('change', {target: {value: "ticket description"}})
        expect(componentWrapper.find('Button[name="createButton"]').props()["disabled"] === false)
        componentWrapper.find('Button[name="createButton"]').at(0).simulate('click')
        expect(CreateTicketSpy).toHaveBeenCalled();
    });

    it('if user does not fill in all required information, user is not able to create ticket', () => {
        instance.forceUpdate();
        expect(componentWrapper.find('Button[name="createButton"]').props()["disabled"] === true)
    });

    it('if user input changes, changeQueueInformation will be triggered and state will be setted accordingly', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="title"]').simulate('change', {target: {value: "new ticket"}})
        componentWrapper.find('input[name="description"]').simulate('change', {target: {value: "ticket description"}})
        expect(notifyChangeSpy).toHaveBeenCalled();
        expect(instance.state.title === "new ticket");
        expect(instance.state.description === "ticket description");
    })
})

describe('EditTicket test', () => {
    const componentWrapper = shallow (<EditTicket ticketId="123" ticketdata={{description: "original description", title: "original title"}} />)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const notifyChangeSpy = jest.spyOn(instance,'notifyChange')
    const editTicketSpy = jest.spyOn(instance, 'edit').mockImplementation(()=>"edit ticket in firebase backend")

    it('if user fill in all required information, user is able to edit ticket', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="title"]').simulate('change', {target: {value: "new ticket"}})
        componentWrapper.find('input[name="description"]').simulate('change', {target: {value: "ticket description"}})
        expect(componentWrapper.find('Button[name="editButton"]').props()["disabled"] === false)
        componentWrapper.find('Button[name="editButton"]').at(0).simulate('click')
        expect(editTicketSpy).toHaveBeenCalled();
    });

    it('if user does not fill in all required information, user is not able to edit Ticket', () => {
        instance.forceUpdate();
        expect(componentWrapper.find('Button[name="editButton"]').props()["disabled"] === true)
    });

    it('if user input changes, notifyChange will be triggered and state will be setted accordingly', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="title"]').simulate('change', {target: {value: "new ticket"}})
        componentWrapper.find('input[name="description"]').simulate('change', {target: {value: "ticket description"}})
        expect(notifyChangeSpy).toHaveBeenCalled();
        expect(instance.state.title === "new ticket");
        expect(instance.state.description === "ticket description");
    })

    it('edit ticket popup should display the original ticket information when instantiated', () => {
        instance.forceUpdate();
        expect(instance.state.title === "original ticket");
        expect(instance.state.description === "orginal description");
    })
})
