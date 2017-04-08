import * as actions from '../constants/actions';
import * as errors from '../constants/errors';
import * as endpoints from '../constants/endpoints';
import md5 from 'md5';

const axios = endpoints.axiosInstance;

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

//thunks

export const login = (credentials)=> {
  const hashedPassword = md5(credentials.password);
  const newCredentials = Object.assign({}, credentials, {password: hashedPassword});
  return (dispatch)=> {
    dispatch(loginPending());
    return axios.post(endpoints.login, JSON.stringify(newCredentials)
  )
    .then((response)=> {
      if (response.data.status === 'success'){
        const userData = {
          username: response.data.username,
          sessionId: response.data.sessionId
        };
        dispatch(loginSuccess());
        dispatch(setUser(userData));
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
    return axios.get(`${endpoints.logout}?sessionId=${sessionId}`)
      .then((response)=> {
      if(response.data.status === 'success') {
        dispatch(removeUser());
      }
    })
      .catch((error)=> {
      if (error.response) throw error.response;
    });
  };
};

//end thunks