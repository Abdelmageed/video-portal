import React from 'react';
import {shallow} from 'enzyme';
import LoginForm from './LoginForm';
import {FormGroup} from 'react-bootstrap';

describe('Login Form', ()=> {
  
  it('has 2 <FormGroup/>s, one for username the other for password', ()=> {
    
    const wrapper = shallow(<LoginForm />);
    const formGroups = wrapper.find(FormGroup);
    
    expect(formGroups.length).toBe(2);
  });
  
  describe('Form Submission', ()=> {
    
    let submit,
        spySubmit,
        spyValidateSubmit,
        wrapper,
        submitButton;
    
    beforeEach(()=> {
     submit = jasmine.createSpy('submit');
      spyOn(LoginForm.prototype, 'validateSubmit');
     wrapper = shallow(
      <LoginForm 
      submit={submit}
     />);
     submitButton = wrapper.find('.login-button');
    });
    
    
    it('submits the user credentials only if both the username and password are provided', ()=> {
    
    
    expect(submitButton.length).toBe(1);
    
    submitButton.simulate('click');
      expect(LoginForm.prototype.validateSubmit).toHaveBeenCalled();
    
    wrapper.setState({
      username: 'name',
      password: 'password'
    }, ()=> {
      wrapper.instance().removeRequiredFieldsError();
    });
    
    submitButton.simulate('click');
    expect(LoginForm.prototype.validateSubmit).toHaveBeenCalled();
    
  });
  
  it('shows an error message if username or password are missing on submit', ()=> {
    
    //username and password are initially ''

    //call the original method and pop error
    LoginForm.prototype.validateSubmit.and.callThrough();
    submitButton.simulate('click');
    let requiredFieldsError = wrapper.find('.required-fields-error');
    expect(requiredFieldsError.length).toBe(1);
    
    wrapper.setState({
      username: 'name',
      password: 'password'
    });
    wrapper.instance().removeRequiredFieldsError();
    
    submitButton.simulate('click');
    requiredFieldsError = wrapper.find('.required-fields-error');
    expect(requiredFieldsError.length).toBe(0);
    
  });
    
  });
  
  it('shows an error message on submitting invalid credentials', ()=> {
    const error = "Wrong username or password";
    let wrapper = shallow(<LoginForm error={error} />);
    
    let errorLabel = wrapper.find('.error-label');
    expect(errorLabel.length).toBe(1);
    
    expect(errorLabel.text()).toBe(error);
    
    wrapper = shallow(<LoginForm />);
    errorLabel =wrapper.find('.error-label');
    expect(errorLabel.length).toBe(0);

  });
});