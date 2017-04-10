import md5 from 'md5';
import {push} from 'react-router-redux';

import * as actions from '../constants/actions';
import * as errors from '../constants/errors';
import * as endpoints from '../constants/endpoints';

const axios = endpoints.axiosInstance;

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
//end video

//thunks

//user
export const login = (credentials)=> {
  const hashedPassword = md5(credentials.password);
  const newCredentials = Object.assign({}, credentials, {password: hashedPassword});
  return (dispatch)=> {
    dispatch(loginPending());
    return axios.post(endpoints.login,
//                      JSON.stringify(newCredentials)
                        newCredentials

  )
    .then((response)=> {
      if (response.data.status === 'success'){
        const userData = {
          username: response.data.username,
          sessionId: response.data.sessionId
        };
        dispatch(loginSuccess());
        dispatch(setUser(userData));
        dispatch(push('/'));
      } else {
        dispatch(loginFailure(response.data.error));
      }
    })
    .catch((error)=> {
      const errorMsg = error.response || errors.server;
      dispatch(loginFailure(errorMsg));
    });
  };
};

export const logout = ()=> {
  return (dispatch, getState)=> {
    const sessionId = getState().user.sessionId;
    return axios.get(endpoints.logout, {
      params: {
        sessionId
      }
    })
      .then((response)=> {
      if(response.data.status === 'success') {
        dispatch(removeUser());
//        browserHistory.push('/login');
        dispatch(push('/login'));
      }
    })
      .catch((error)=> {
      if (error.response) throw error.response;
    });
  };
};
//end user

//videos
export const getVideos = ()=> {
  return (dispatch, getState)=> {
    const sessionId = getState().user.sessionId,
        skip = getState().videos.length,
        limit = 3;
    return axios.get(endpoints.videos, {
      params: {
        sessionId,
        skip,
        limit
      }
    })
      .then((response)=> {
        dispatch(loadVideos(response.data.data));
      })
      .catch((error)=> {
        if (error.response) throw error.response;
      })
  };
};

export const rateVideo = (videoId, rating)=> {
  return (dispatch, getState)=> {
    const sessionId = getState().user.sessionId;
    return axios.post(`${endpoints.rating}?sessionId=${sessionId}`, {videoId, rating})
      .then(()=> {
        dispatch(addRating(videoId, rating));
      })
      .catch((error)=> {
        if (error.response) throw error.response;
      });
  };
};
//end videos

//video
export const getVideo = (videoId)=> {
  return (dispatch, getState)=> {
    const sessionId = getState().user.sessionId;
    return axios.get(endpoints.video, {
      params: {
        sessionId,
        videoId
      }
    })
      .then((response)=> {
        dispatch(loadVideo(response.data.data));
      })
      .catch((error)=> {
        if (error.response) throw error.response;
      });
  };
};
//end video

//end thunks