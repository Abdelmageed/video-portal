import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';

import * as actionCreators from './actions/actionCreators';

import App from './components/App';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import VideoDetailsPage from './containers/VideoDetailsPage';
import NotFoundPage from './components/NotFoundPage';

import {resetLoadedVideos, resetLoadedVideo} from './actions/actionCreators';
import {getVideo} from './actions/thunkCreators';

export const getRoutes = (store) => {
  
  const redirectIfNotAuth = (nextState, replace) => {
    //use our manually persisted sessionId in local storage as redux-persist store rehydration happens after page reload, we need it before that
    const sessionId =  localStorage.getItem('sessionId');
      const isAuthenticated = (sessionId !== '');
      if(!isAuthenticated) {
        replace({
          pathname: 'login'
        });
      }
  };
  
  const handleIndexOnEnter = (nextState, replace) => {
    redirectIfNotAuth(nextState, replace);
    store.dispatch(resetLoadedVideos());
    window.scrollTo(0, 0);
  };
  
  const handleDetailsOnEnter = (nextState, replace) => {
    redirectIfNotAuth(nextState, replace);
    store.dispatch(resetLoadedVideo());
    store.dispatch(getVideo(nextState.params.id));
    window.scrollTo(0, 0);
  };
  
  return (
    <Route path="/" component={App}>
       <IndexRoute component={IndexPage} onEnter={handleIndexOnEnter}/>
       <Route path="video/:id" component={VideoDetailsPage} onEnter={handleDetailsOnEnter} />
     <Route path="login" component={LoginPage} />
     <Route path="*" component={NotFoundPage} />
    </Route>
  );
};