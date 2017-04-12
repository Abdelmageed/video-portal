import React from 'react';
import {shallow} from 'enzyme';

import VideoGrid from './VideoGrid';
import InfiniteScroll from 'redux-infinite-scroll';

const videosData = [
  {
    "_id": "58e7f19d0e2d4b0f10eb365d",
    "name": "[0] Getting Started With ReactJs",
    "description": "",
    "url": "videos/Getting_Started_With_React.js.mp4",
    "ratings": [1, 5, 5, 4, 3, 4, 2, 5]
  }, {
    "_id": "58e7f19d0e2d4b0f10eb365e",
    "name": "[1] Google Cardboard Assembly",
    "description": "",
    "url": "videos/Google_Cardboard_Assembly.mp4",
    "ratings": [4, 5, 5, 5, 3, 5, 4, 5]
  }, {
    "_id": "58e7f19d0e2d4b0f10eb365f",
    "name": "[2] How Does AngularJS Work Beginners Angular Tutorial",
    "description": "",
    "url": "videos/How_Does_AngularJS_Work_Beginners_Angular_Tutorial.mp4",
    "ratings": [2, 4, 2, 2, 3, 1, 2, 5]
  }
];

describe('Video Grid Component', ()=> {
  
  let wrapper;
  beforeEach(()=> {
    wrapper = shallow(<VideoGrid videos={videosData}/>);
  });
  
  it('should have an infinite scroller', ()=> {
    expect(wrapper.find(InfiniteScroll).length).toBe(1);
  });
});