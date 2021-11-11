
import React from 'react'
import { shallow } from 'enzyme'
import { SignInFormBase } from '../components/SignIn'

describe('SignInForm - Form test ', () => {
    const componentWrapper = shallow (<SignInFormBase/>)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const notifyUpdateSpy = jest.spyOn(instance, 'notifyUpdate')
    const signinSpy = jest.spyOn(instance,'signin').mockImplementation(()=>"call firebase doSignInWithEmailAndPassword")

    it('when email address and passwords ill formatted/empty, user should not be able to sign in', () => {
        instance.forceUpdate();
        componentWrapper.find('Button[name="submitButton"]').at(0).simulate('click')
        expect(instance.state.error == "The email address is badly formatted.");
    });

     it('when user fill in email address, notifyUpdate function should be triggered', () => {
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="email"]').simulate('change', {target: {value: "123@gmail.com"}})
        expect(notifyUpdateSpy).toHaveBeenCalled();
    })
   
    it('when user fill in password, notifyUpdate function should be triggered', () => {
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="password"]').simulate('change', {target: {value: "123456"}})
        expect(notifyUpdateSpy).toHaveBeenCalled();
    })

    it('when user fill in unregistered email and password and click on Sign in Button, error message should be printed', () => {
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="email"]').simulate('change', {target: {value: "123@gmail.com"}}) 
        componentWrapper.find('FormControl[name="password"]').simulate('change', {target: {value: "1234567"}})
        componentWrapper.find('Button[name="submitButton"]').at(0).simulate('click')
        instance.forceUpdate();
        expect(instance.state.error == "There is no user record corresponding to this identifier. The user may have been deleted.");
    }) 

    it('when user fill in valid email and password and click on Sign in Button, method signin should be triggered', () => {
        componentWrapper.find('Form')
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="email"]').simulate('change', {target: {value: "jiaxin@gmail.com"}}) 
        componentWrapper.find('FormControl[name="password"]').simulate('change', {target: {value: "123456"}})
        instance.forceUpdate();
        expect(instance.state.email=='jiaxin@gmail.com')
        expect(instance.state.email=='123456')
        componentWrapper.find('Form').simulate('submit')
        expect(signinSpy).toHaveBeenCalledTimes(1)
    }) 
})
