import React from 'react'
import { shallow } from 'enzyme'
import { JoinQueue } from '../components/Queue/joinQueue'

describe('joinQueue test ', () => {
    const componentWrapper = shallow (<JoinQueue/>)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const changeQueueInformationSpy = jest.spyOn(instance, 'changeQueueInformation')
    const joinQueueSpy = jest.spyOn(instance,'joinQueue').mockImplementation(()=>"call firebase dbExistQueue and dbJoinQueue")

    it('when class token is left empty, join queue button is disabled', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="queueToken"]').simulate('change',{target: {value: ''}})
        expect((componentWrapper.find('Button[name="joinButton"]').props()["disabled"])===true);
    });

    it('when class token is wrong, existQueue should be set to false and user should see reminder', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="queueToken"]').simulate('change',{target: {value: '123'}}) 
        expect(instance.state.existQueue === false);
    });

    it('when class token is set, user should be able to trigger joinQueue', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="queueToken"]').simulate('change',{target: {value: 'token'}}) 
        expect((componentWrapper.find('Button[name="joinButton"]').props()["disabled"])===false);
        componentWrapper.find('Button[name="joinButton"]').simulate('click')
        expect(joinQueueSpy).toHaveBeenCalled();
    });
     
    it('when user input token changes, changeQueueInformation should be triggered to update the state of the instance', () => {
        instance.forceUpdate();
        componentWrapper.find('input[name="queueToken"]').simulate('change',{target: {value: 'token'}}) 
        expect(changeQueueInformationSpy).toHaveBeenCalled();
        expect(instance.state.queueToken === "token");
    }); 
})
