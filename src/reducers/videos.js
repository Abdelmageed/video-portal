import {initialState} from '../initialState';
import * as actions from '../constants/actions';

function addRating(videos, id, rating) {
  let newVideos = videos.slice();
  newVideos.forEach((video)=> {
    if(video._id === id){
      video.ratings.push(parseInt(rating));
    }
  });
  return newVideos;
}

export default function videos(state = initialState.videos, action) {
  switch(action.type) {
      
    case actions.LOAD_VIDEOS:
      return state.concat(action.videos);
    case actions.ADD_RATING:
      return addRating(state, action.videoId, action.rating);
      
    default:
      return state;
  }
}