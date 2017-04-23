import md5 from 'md5';
import {push} from 'react-router-redux';

import * as actions from './actionCreators';
import * as errors from '../constants/errors';
import * as endpoints from '../constants/endpoints';

const axios = endpoints.axiosInstance;

//user
export const login = (credentials)=> {
  const hashedPassword = md5(credentials.password);
  const newCredentials = Object.assign({}, credentials, {password: hashedPassword});
  return (dispatch)=> {
    dispatch(actions.loginPending());
    return axios.post(endpoints.login,
                        newCredentials

  )
    .then((response)=> {
      if (response.data.status === 'success'){
        const userData = {
          username: response.data.username,
          sessionId: response.data.sessionId
        };
        dispatch(actions.loginSuccess());
        dispatch(actions.setUser(userData));
        dispatch(push('/'));
      } else {
        dispatch(actions.loginFailure(response.data.error));
      }
    })
    .catch((error)=> {
      const errorMsg = error.response || errors.server;
      dispatch(actions.loginFailure(errorMsg));
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
        dispatch(actions.removeUser());
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
  console.log('getVideos dispatched');
  return (dispatch, getState)=> {
    dispatch(actions.loadingVideos());
    const sessionId = getState().user.sessionId,
        skip = getState().videos.items.length,
        limit = 10;
    if(sessionId === ''){ 
      //for page refresh inconsistency with redux-persist
      return;
    }
    return axios.get(endpoints.videos, {
      params: {
        sessionId,
        skip,
        limit
      }
    })
      .then((response)=> {
        const videos = response.data.data;
        if(videos.length > 0){
          dispatch(actions.loadVideos(videos));
        } else {
          dispatch(actions.loadedAllVideos());
        }
        dispatch(actions.loadedVideos());
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
        dispatch(actions.addRatingAtDetails(videoId, rating));
        dispatch(actions.addRating(videoId, rating));
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
    if(sessionId === ''){
      //for page refresh inconsistency with redux-persist
      return;
    }
    return axios.get(endpoints.video, {
      params: {
        sessionId,
        videoId
      }
    })
      .then((response)=> {
        dispatch(actions.loadVideo(response.data.data));
      })
      .catch((error)=> {
        if (error.response) throw error.response;
      });
  };
};
//end video