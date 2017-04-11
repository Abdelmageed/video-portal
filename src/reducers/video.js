import {initialState} from '../initialState';
import * as actions from '../constants/actions';

function addRating(state, id, rating) {
  if(state._id && state._id === id) {
    return Object.assign({}, state, {ratings: state.ratings.concat(parseInt(rating))});
  }
  return state;
}

export default function video(state = initialState.video, action) {
  switch(action.type) {
    
    case actions.LOAD_VIDEO:
      return action.video;
      
    case actions.RESET_LOADED_VIDEO:
      return {};
      
    case actions.ADD_RATING_AT_DETAILS:
      return addRating(state, action.id, action.rating);
      
    default:
      return state;
  }
}