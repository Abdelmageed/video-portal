import React from 'react';
import {shallow} from 'enzyme';
import VideoDetailsPage from './VideoDetailsPage';
import {Grid} from 'react-bootstrap';

 const videoData = {
    "_id": "58e7f19d0e2d4b0f10eb365d",
    "name": "[0] Getting Started With ReactJs",
    "description": "",
    "url": "videos/Getting_Started_With_React.js.mp4",
    "ratings": [1, 5, 5, 4, 3, 4, 2, 5]
  };

//describe('VideoDetailsPage Component', ()=> {
//  
//let wrapper;
//  beforeAll(()=> {
//    wrapper = shallow(<VideoDetailsPage video={videoData}/>);
//  });
//  
//    
//    it('should render the main video and the side list as a grid for desktop', ()=> {
//      wrapper.instance().state = {
//        extraSmall: false
//      };
//      expect(wrapper.find(Grid).length).toBe(1);
//    });
//    
//});