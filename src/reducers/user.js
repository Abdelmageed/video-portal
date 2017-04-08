import {initialState} from '../initialState';
import * as actions from '../constants/actions';

export default function user(state = initialState.user, action){
  switch(action.type){
      
    case actions.SET_USER:
      return Object.assign({}, state, action.user);
      
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggingIn: false,
            login: {
              error: ''
            }
      });
      
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggingIn: false,
        login: {
          error: action.error
        }
      });
      
    case actions.REMOVE_USER:
      return Object.assign({}, state, {
        username: '',
        sessionId: ''
      });
      
    case actions.LOGIN_PENDING:
      return Object.assign({}, state, {
        loggingIn: true
      });
      
    default:
      return state;
  }
}