import React from 'react';
import {shallow} from 'enzyme';
import {IndexLink} from 'react-router';
import {Navbar} from 'react-bootstrap';

import Nav from './Nav';
import LogoutButton from '../containers/LogoutButton';

describe('Nav', ()=> {
  
  let wrapper = shallow(<Nav />);
 
  it('renders no LogoutButton for guests and LogoutButton for authenticated users', ()=> {
    
    wrapper = shallow(<Nav username="" />);
    expect(wrapper.find(LogoutButton).length).toBe(0);
    
    wrapper = shallow(<Nav username="I am no guest"/>);
    expect(wrapper.find(LogoutButton).length).toBe(1);
    
  });
  
  it('renders a brand with link to "/" i.e:"IndexPage"', ()=> {
    
    const brand = wrapper.find(Navbar.Brand);
    expect(brand.length).toBe(1);
    
    const link = brand.find(IndexLink);
    expect(link.length).toBe(1);
    expect(link.prop('to')).toBe('/');
  });
  
});