import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import video from './video';
import {initialState} from '../initialState';
import * as actionNames from '../constants/actions';
import * as endpoints from '../constants/endpoints';
import * as actions from '../actions/actionCreators';

let axiosMock,
  storeMock,
  axios = endpoints.axiosInstance,
  videoData = {
    "_id": "58e7f19d0e2d4b0f10eb365d",
    "name": "[0] Getting Started With ReactJs",
    "description": "",
    "url": "videos/Getting_Started_With_React.js.mp4",
    "ratings": [1, 5, 5, 4, 3, 4, 2, 5]
  };

describe('Video Reducer', ()=> {
  
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    let middlewares = [thunk];
    storeMock = configureStore(middlewares);
  });

  afterEach(() => {
    axiosMock.restore();
  });
  
  it('should handle LOAD_VIDEO', ()=> {
    const action = actions.loadVideo(videoData),
        state = initialState.video,
        nextState = videoData;
    
    expect(video(state, action)).toEqual(nextState);
    
  });
  
  it('should get a video', (done)=> {
    done();
  });
  
})