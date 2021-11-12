
import React from 'react'
import { shallow } from 'enzyme'
import { CreateQueue } from '../components/Queue/createQueue'

describe('createQueue test ', () => {
    const componentWrapper = shallow (<CreateQueue/>)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const changeQueueNameSpy = jest.spyOn(instance,'changeQueueName')
    const createQueueSpy = jest.spyOn(instance, 'createQueue').mockImplementation(()=>"create queue in firebase backend")

    it('create queue when create button is clicked', () => {
        instance.forceUpdate();
        componentWrapper.find('Button').at(0).simulate('click')
        expect(createQueueSpy).toHaveBeenCalled();
    });

    it('change queue name when input changes', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="queueName"]').simulate('change', {target: {value: "CS130"}})
        expect(changeQueueNameSpy).toHaveBeenCalled();
    })
})