import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import videos from './videos';
import {initialState} from '../initialState';
import * as actionNames from '../constants/actions';
import * as endpoints from '../constants/endpoints';
import * as actions from '../actions/actionCreators';


let axiosMock,
  storeMock,
  axios = endpoints.axiosInstance,
  videosData = [
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
],
  newVideosData  = [
  {
    "_id": "58e7f19d0e2d4b0f10eb365d",
    "name": "[0] Getting Started With ReactJs",
    "description": "",
    "url": "videos/Getting_Started_With_React.js.mp4",
    "ratings": [1, 5, 5, 4, 3, 4, 2, 5, 1]
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

describe('Videos Reducer', ()=> {
  
   beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    let middlewares = [thunk];
    storeMock = configureStore(middlewares);
  });

  afterEach(() => {
    axiosMock.restore();
  });
  
  it('should handle LOAD_VIDEOS, concatentating the loaded videos to the current state items', ()=> {
    
    const action = actions.loadVideos(videosData),
        state = initialState.videos,
        nextState = Object.assign({}, state, {
          items: initialState.videos.items.concat(videosData)
        });
//    console.log(action);
    expect(videos(state, action)).toEqual(nextState);
    
//    expect(videos(nextState, action)).toEqual(nextState.concat(videosData));
  });
  
  it('should handle ADD_RATING, pushing the rating to video.ratings with videoId', ()=> {
    //just 1 dummy test case
    
    const videoId =  '58e7f19d0e2d4b0f10eb365d',
      rating = '1',
      action = actions.addRating(videoId, rating),
      state = Object.assign({}, initialState, {items: videosData}),
      nextState = Object.assign({}, initialState, {items: newVideosData});
    expect(videos(state, action)).toEqual(nextState);
  });
  
  it('should get videos', (done)=> {
    done();
  });
  
  it('should rate a video', (done)=> {
    done();
  });
  
  
  
});