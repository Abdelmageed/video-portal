import {initialState} from '../initialState';
import * as actions from '../constants/actions';

export default function video(state = initialState.video, action) {
  switch(action.type) {
    
    case actions.LOAD_VIDEO:
      return action.video;
    
    default:
      return state;
  }
}