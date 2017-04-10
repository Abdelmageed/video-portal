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
  console.log(state);
  return Object.assign({}, state, {items: newVideos});
}

export default function videos(state = initialState.videos, action) {
  switch(action.type) {
      
    case actions.LOAD_VIDEOS:
      return loadVideos(state, action.videos);
    case actions.ADD_RATING:
      return addRating(state, action.videoId, action.rating);
      
    default:
      return state;
  }
}