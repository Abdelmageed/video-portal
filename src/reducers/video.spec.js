import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import video from './video';
import {initialState} from '../initialState';
import * as actionNames from '../constants/actions';
import * as endpoints from '../constants/endpoints';
import * as actions from '../actions/actionCreators';
import * as thunks from '../actions/thunkCreators';

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
  
  it('should handle RESET_LOADED_VIDEO', ()=> {
    const action = actions.resetLoadedVideo(),
        state = initialState.video,
        nextState = {};
    
    expect(video(state, action)).toEqual(nextState);
  });
  
  it('should handle ADD_RATING_AT_DETAILS, returning the previous state if IDs do not match', ()=> {
    const id = 'someMismatchingId',
      rating = 4,
      action = actions.addRatingAtDetails(id, rating),
      state = initialState.video,
      nextState = state;
    
    expect(video(state, action)).toEqual(nextState);
  });
  
    it('should handle ADD_RATING_AT_DETAILS, adding the rating if IDs match', ()=> {
    const id = videoData._id,
      rating = 4,
      action = actions.addRatingAtDetails(id, rating),
      state = videoData,
      nextState = Object.assign({}, state, {ratings: state.ratings.concat(rating)});
    
    expect(video(state, action)).toEqual(nextState);
  });
  
  it('should get a video', (done)=> {
    done();
  });
  
})