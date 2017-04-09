import {shallow, mount} from 'enzyme';
//import sinon from 'sinon';
import React from 'react';
import {Overlay, Button} from 'react-bootstrap';
import CustomOverlay from './CustomOverlay';
import LoginForm from './LoginForm';

describe('Custom Overlay', ()=> {
  
  it('should have a trigger button and an Overlay component', ()=> {
    const wrapper = shallow(<CustomOverlay />);
    
    const triggerButton = wrapper.find(Button);
    expect(triggerButton.length).toBe(1);
    
    const overlay = wrapper.find(Overlay);
    expect(overlay.length).toBe(1);
    
    
  });
  
  it('should toggle showing overlay on button click', ()=> {
    const wrapper = shallow(<CustomOverlay />);
    
    const triggerButton = wrapper.find(Button);
    spyOn(wrapper.instance(), 'toggle');
    
    triggerButton.simulate('click');
    expect(wrapper.instance().toggle).toHaveBeenCalled();
  });
  
  it('should render the passed triggerText on trigger button', ()=> {
    const triggerText = 'Login';
    const wrapper = mount(<CustomOverlay triggerText={triggerText}/>);
    const triggerButton = wrapper.find(Button);
    
    expect(triggerButton.text()).toBe(triggerText);
  });
  
  it('should have the passed popover inside the Overlay', ()=> {
    
    const wrapper = shallow(<CustomOverlay 
    popover={<LoginForm />} />);
    
    const form = wrapper.find(Overlay).find(LoginForm);
    
    expect(form.length).toBe(1);
    
  });
});