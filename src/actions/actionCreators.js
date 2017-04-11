import * as actions from '../constants/actions';
import * as errors from '../constants/errors';

//user
export const setUser = (user)=> ({
  type: actions.SET_USER,
  user
});

export const removeUser = ()=> ({
  type: actions.REMOVE_USER
});

export const loginSuccess = ()=> ({
  type: actions.LOGIN_SUCCESS
});

export const loginFailure = (error)=> ({
  type: actions.LOGIN_FAILURE,
  error
});

export const loginPending = ()=> ({
  type: actions.LOGIN_PENDING
});
//end user

//videos
export const loadVideos = (videos)=> ({
  type: actions.LOAD_VIDEOS,
  videos
});

export const addRating = (videoId, rating)=> ({
  type: actions.ADD_RATING,
  videoId,
  rating
});

export const loadedAllVideos = ()=> ({
  type: actions.LOADED_ALL_VIDEOS
});

export const loadingVideos = ()=> ({
  type: actions.LOADING_VIDEOS
});

export const loadedVideos = ()=> ({
  type: actions.LOADED_VIDEOS
});

export const resetLoadedVideos = ()=> ({
  type: actions.RESET_LOADED_VIDEOS
});
//end videos


//video
export const loadVideo = (video)=> ({
  type: actions.LOAD_VIDEO,
  video
});

export const resetLoadedVideo = ()=> ({
  type: actions.RESET_LOADED_VIDEO
});

export const addRatingAtDetails = (id, rating)=> ({
  type: actions.ADD_RATING_AT_DETAILS,
  id,
  rating
});
//end video

//thunks

//end thunks