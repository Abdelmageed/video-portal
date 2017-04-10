import {initialState} from '../initialState';
import * as actions from '../constants/actions';

function addRating(state, id, rating) {
  let newVideos = state.items.slice();
  newVideos.forEach((video)=> {
    if(video._id === id){
      video.ratings.push(parseInt(rating));
    }
  });
  return Object.assign({}, state, {items: newVideos});
}

function loadVideos(state, videos) {
  const newVideos = state.items.concat(videos);
  return Object.assign({}, state, {items: newVideos});
}

export default function videos(state = initialState.videos, action) {
  switch(action.type) {
      
    case actions.LOAD_VIDEOS:
      return loadVideos(state, action.videos);
    case actions.ADD_RATING:
      return addRating(state, action.videoId, action.rating);
    case actions.LOADING_VIDEOS:
      return Object.assign({}, state, {loading: true});
    case actions.LOADED_VIDEOS:
      return Object.assign({}, state, {loading: false});
    case actions.LOADED_ALL_VIDEOS:
      return Object.assign({}, state, {loadedAll: true});
    case actions.RESET_LOADED_VIDEOS:
      return Object.assign({}, state, {
        items: [], loadedAll: false
      });
    default:
      return state;
  }
}