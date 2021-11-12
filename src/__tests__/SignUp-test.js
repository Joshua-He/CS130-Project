import React from 'react'
import { shallow } from 'enzyme'
import { SignUpFormBase } from '../components/SignUp'

describe('SignUpForm - Form test ', () => {
    const componentWrapper = shallow (<SignUpFormBase/>)
    console.log(componentWrapper.debug())
    const instance = componentWrapper.instance()
    const notifyChangeSpy = jest.spyOn(instance, 'notifyChange')
    const SignUpSpy = jest.spyOn(instance,'signup').mockImplementation(()=>"call firebase doSignUpWithEmailAndPassword")

    it('when email address, password, fullName are ill formatted/empty, user should not be able to sign up', () => {
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="email"]').simulate('change', {target: {value: "123@gmail.com"}}) 
        componentWrapper.find('FormControl[name="passwordOne"]').simulate('change', {target: {value: "1234567"}})
        componentWrapper.find('Button[name="submitButton"]').at(0).simulate('click')
        expect(componentWrapper.find('Button').props('disabled') == true);
    });

     it('when user fill in any fields (email address, password, fullName), notifyChange function should be triggered, state should be updated as well', () => {
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="email"]').simulate('change', {target: {value: "123@gmail.com"}})
        expect(notifyChangeSpy).toHaveBeenCalled();
        expect(instance.state.email == "123@gmail.com")
    })
   
    it('when user types in two different passwords, user will not be able to sign up', () => {
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="passwordOne"]').simulate('change', {target: {value: "123456"}})
        componentWrapper.find('FormControl[name="passwordTwo"]').simulate('change', {target: {value: "1234567"}})
        expect(componentWrapper.find('Button').props('disabled') == true);
        expect(notifyChangeSpy).toHaveBeenCalled();
    })

    it('when user fill in valid information and click on Sign up Button, method SignUp should be triggered', () => {
        componentWrapper.find('Form')
        instance.forceUpdate();
        componentWrapper.find('FormControl[name="email"]').simulate('change', {target: {value: "jiaxin@gmail.com"}}) 
        componentWrapper.find('FormControl[name="passwordOne"]').simulate('change', {target: {value: "123456"}})
        componentWrapper.find('FormControl[name="passwordTwo"]').simulate('change', {target: {value: "jiaxin@gmail.com"}}) 
        componentWrapper.find('FormControl[name="fullName"]').simulate('change', {target: {value: "Jiaxin"}})
        instance.forceUpdate();
        componentWrapper.find('Form').simulate('submit')
        expect(SignUpSpy).toHaveBeenCalledTimes(1)
    }) 
})