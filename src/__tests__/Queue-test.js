import React from 'react'
import { shallow } from 'enzyme'
import { CreateQueue } from '../components/Queue/createQueue'

describe('CreateQueue, EditQueue test', () => {
    const componentWrapper = shallow (<CreateQueue/>)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const changeQueueInformationSpy = jest.spyOn(instance,'changeQueueInformation')
    const createQueueSpy = jest.spyOn(instance, 'createQueue').mockImplementation(()=>"create queue in firebase backend")

    it('if user fill in all required information, user is able to createQueue/EditQueue', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="queueName"]').simulate('change', {target: {value: "new queue"}})
        componentWrapper.find('input[name="description"]').simulate('change', {target: {value: "queue description"}})
        componentWrapper.find('input[name="queueStartTime"]').simulate('change', {target: {value: "1:00"}}) 
        componentWrapper.find('input[name="queueEndTime"]').simulate('change', {target: {value: "2:00"}})
        expect(componentWrapper.find('Button[name="createButton"]').props()["disabled"] === false)
        componentWrapper.find('Button[name="createButton"]').at(0).simulate('click')
        expect(createQueueSpy).toHaveBeenCalled();
    });

    it('if user does not fill in all required information, user is not able to createQueue/EditQueue', () => {
        instance.forceUpdate();
        expect(componentWrapper.find('Button[name="createButton"]').props()["disabled"] === true)
    });

    it('if user input changes, changeQueueInformation will be triggered and state will be setted accordingly', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="queueName"]').simulate('change', {target: {value: "CS130"}})
        componentWrapper.find('input[name="description"]').simulate('change', {target: {value: "queue description"}})
        componentWrapper.find('input[name="queueStartTime"]').simulate('change', {target: {value: "1:00"}}) 
        componentWrapper.find('input[name="queueEndTime"]').simulate('change', {target: {value: "2:00"}})
        componentWrapper.find('input[name="queueVLocation"]').simulate('change', {target: {value: "zoom"}})
        expect(changeQueueInformationSpy).toHaveBeenCalled();
        expect(instance.state.queueName === "CS130");
        expect(instance.state.description === "queue description");
        expect(instance.state.queueStartTime === "1:00");
        expect(instance.state.queueEndTime === "2:00");
        expect(instance.state.queueVLocation === "zoom");
    })
})