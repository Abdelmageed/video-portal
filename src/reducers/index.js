import { combineReducers } from 'redux';

import user from './user';
import videos from './videos';
import video from './video';

 export default combineReducers({
   user,
   videos,
   video
 });
