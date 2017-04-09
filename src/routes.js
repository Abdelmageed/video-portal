import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';

import * as actionCreators from './actions/actionCreators';

import App from './components/App';
import IndexPage from './components/IndexPage';
import LoginPage from './containers/LoginPage';
import VideoDetailsPage from './components/VideoDetailsPage';

export const getRoutes = () => {
  
  const redirectIfNotAuth = (nextState, replace) => {
    //check persisted store in local storage for sessionId
    //as store rehydration happens after page reload, we need
    //it before that
  }
  
  return (
    <Route path="/" component={App}>
       <IndexRoute component={IndexPage} />
       <Route path="login" component={LoginPage} />
       <Route path="video/:id" component={VideoDetailsPage} />
    </Route>
  );
};