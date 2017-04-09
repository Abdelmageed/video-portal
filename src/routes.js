import React from 'react';
import {Route, IndexRoute, browserHistory} from 'react-router';

import * as actionCreators from './actions/actionCreators';

import App from './components/App';
import IndexPage from './components/IndexPage';
import LoginPage from './containers/LoginPage';
import VideoDetailsPage from './components/VideoDetailsPage';

export const getRoutes = () => {
  
  const redirectIfNotAuth = (nextState, replace) => {
    //use our manually persisted sessionId in local storage as redux-persist store rehydration happens after page reload, we need it before that
    const sessionId =  localStorage.getItem('sessionId');
      const isAuthenticated = (sessionId !== '');
      if(!isAuthenticated) {
        console.log('not auth redirect');
        replace({
          pathname: 'login'
        });
      }
  };
  
  return (
    <Route path="/" component={App}>
       <IndexRoute component={IndexPage} onEnter={redirectIfNotAuth}/>
       <Route path="video/:id" component={VideoDetailsPage} onEnter={redirectIfNotAuth}/>
     <Route path="login" component={LoginPage} />
    </Route>
  );
};