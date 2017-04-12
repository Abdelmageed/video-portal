import React from 'react';
import {shallow} from 'enzyme';
import IndexPage from './IndexPage';
import VideoGrid from '../containers/VideoGrid';

describe('App Component', ()=> {
  
let wrapper;
  beforeAll(()=> {
    wrapper = shallow(<IndexPage />);
  });
  
    
    it('should render a VideoGrid', ()=> {
      expect(wrapper.find(VideoGrid).length).toBe(1);
    });
});