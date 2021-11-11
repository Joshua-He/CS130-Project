
/* Dependencies */
import React from 'react'
import { shallow } from 'enzyme'

import { SignInForm } from '../components/SignIn'

describe('SignInForm component test ', () => {
    it('when submit button is clicked, it should call doSiginInWithEmailAndPassword', () => {
        const mockClick = jest.fn()
        const componentWrapper = shallow(<SignInForm/>);
        componentWrapper.find('.submitButton').at(0).simulate('click')
        expect(mockClick).toHaveBeenCalled();
    })
})
