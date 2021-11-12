import React from 'react'
import { shallow } from 'enzyme'
import { QueueDashboard } from '../components/Queue/queue'

describe('QueueDashboard test ', () => {
    const componentWrapper = shallow (<QueueDashboard/>)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const enterQueueSpy = jest.spyOn(instance, 'enterQueue').mockImplementation(()=>"enter a queue from main page")

    // it('enter queue when buttom is clicked', () => {
    //     instance.forceUpdate();
    //     componentWrapper.find('Button').at(0).simulate('click')
    //     expect(enterQueueSpy).toHaveBeenCalled();
    // });
})