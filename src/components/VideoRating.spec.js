import React from 'react';
import {shallow} from 'enzyme';

import VideoRating from './VideoRating';
import StarRatingForm  from './StarRatingForm';

describe('VideoRating Component', ()=> {
  
  const testRatings = [4, 5];
  
  let wrapper;
  
  it('should render a StarRatingForm Component if showEdit is true', ()=> {
    wrapper = shallow(<VideoRating ratings={testRatings} showEdit={true}/>);

    expect(wrapper.find(StarRatingForm).length).toBe(1);
  });
  
  it('should not render a StarRatingForm Component if showEdit is false', ()=> {
    wrapper = shallow(<VideoRating ratings={testRatings} showEdit={false}/>);

    expect(wrapper.find(StarRatingForm).length).toBe(0);
  })
  
});