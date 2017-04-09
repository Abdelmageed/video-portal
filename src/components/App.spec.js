// Must have at least one test file in this directory or Mocha will throw an error.

import React from 'react';
import {shallow} from 'enzyme';
import App from './App';


describe('App Component', ()=> {
let wrapper;
  beforeAll(()=> {
    wrapper = shallow(<App />);
  });
    
});