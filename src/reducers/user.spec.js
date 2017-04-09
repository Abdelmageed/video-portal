import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {push} from 'react-router-redux';

import user from './user';
import {initialState}
from '../initialState';
import * as actionNames from '../constants/actions';
import * as endpoints from '../constants/endpoints';
import * as actions from '../actions/actionCreators';
import * as errors from '../constants/errors';

let axiosMock,
  storeMock,
  axios = endpoints.axiosInstance;

describe('User Reducer', () => {

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    let middlewares = [thunk];
    storeMock = configureStore(middlewares);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should return the initial state on unknown actions', () => {
    const action = 'unknown';
    expect(user(initialState.user, action)).toEqual(initialState.user);
  });

  it('should return the initial state if passed undefined', () => {
    const action = 'unkown';
    expect(user(undefined, action)).toEqual(initialState.user);
  });

  it('should handle SET_USER', () => {
    const someUser = {
        sessionId: 'a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV',
        username: 'Ali'
      },
      action = actions.setUser(someUser),
      state = initialState.user,
      nextState = Object.assign({}, state, action.user);

    expect(user(state, action)).toEqual(nextState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = actions.loginSuccess(),
      state = Object.assign({}, initialState.user, {
        loggingIn: true,
        login: Object.assign({}, initialState.user.login, {
          error: errors.login
        })
      }),
      nextState = Object.assign({}, state, {
        loggingIn: false,
        login: {
          error: ''
        }
      });

    expect(user(state, action)).toEqual(nextState);
  });

  it('should handle LOGIN_FAILURE', () => {
    const action = actions.loginFailure(errors.login),
      state = Object.assign({}, initialState.user, {
        loggingIn: true
      }),
      nextState = Object.assign({}, initialState.user, {
        loggingIn: false,
        login: {
          error: action.error
        }
      });
    expect(user(state, action)).toEqual(nextState);
  });

  it('should handle LOGIN_PENDING', () => {
    const action = actions.loginPending(),
      state = initialState.user,
      nextState = Object.assign({}, state, {
        loggingIn: true
      });
    expect(user(state, action)).toEqual(nextState);

  });

  it('should handle REMOVE_USER', () => {
    const action = actions.removeUser(),
      state = Object.assign(initialState.user, {
        username: 'ali',
        sessionId: 'a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV'
      }),
      nextState = Object.assign({}, state, {
        username: '',
        sessionId: ''
      });
    expect(user(state, action)).toEqual(nextState);
  });

  it('should set user on successful login', (done) => {
    const response = {
        sessionId: 'a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV',
        username: 'Ali',
        status: 'success'
      },
      userData = {
        username: response.username,
        sessionId: response.sessionId
      },
      credentials = {
        username: 'ali',
        password: 'passowrd'
      },
      expectedActions = [
        actions.loginPending(),
        actions.loginSuccess(),
        actions.setUser(userData),
        push('/')
      ],
      store = storeMock({});

    axiosMock.onPost(endpoints.login)
      .reply(200, response);

    store.dispatch(actions.login(credentials));
    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 10);

  });

  it('should set a login error message on unsuccessful login', (done) => {
    const response = {
        status: 'error',
        error: 'Invalid username or password'
      },
      credentials = {
        username: 'ali',
        password: 'passowrd'
      },
      expectedActions = [
        actions.loginPending(),
        actions.loginFailure(response.error)
      ],
      store = storeMock({});

    axiosMock.onPost(endpoints.login)
      .reply(200, response);

    store.dispatch(actions.login(credentials));
    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 10);
  });

  it('should logout and remove user data', (done) => {
    const expectedActions = [
      actions.removeUser(),
      push('/login')
    ],
      response = {
        status: 'success'
      },
      sessionId = 'a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV',
      store = storeMock(
        Object.assign({}, initialState, {
          user: Object.assign({}, initialState.user, {
            sessionId
          })
        })
      );

    axiosMock.onGet(endpoints.logout)
      .reply(200, response);

    store.dispatch(actions.logout());

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 10);

  });

});