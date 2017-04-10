// Set up your application entry point here...
import configureStore from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom'; //comment when running coverage
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import {Router, browserHistory} from 'react-router';
import App from './components/App';
import './index.css';
import * as actions from './actions/actionCreators';
import {getRoutes} from './routes';
import './favicon.ico';
import 'bootstrap/dist/css/bootstrap.css';
require("font-awesome-webpack");

const store = configureStore();

//work around redux persist not saving state to local storage before routes onEnter hooks
store.subscribe(()=> {
  const sessionId = store.getState().user.sessionId;
  localStorage.setItem('sessionId', sessionId);
});
//setTimeout(() => {
//  store.dispatch(actions.getVideos());
//  console.log('got first 4 videos');
//}, 5000);
//test actions
//store.dispatch(actions.login({username: 'ali', password: 'password'}));
//setTimeout(()=> {
//  console.log(store.getState());
//  store.dispatch(actions.logout());
//  setTimeout(()=> {
//    console.log(store.getState());
//    store.dispatch(actions.login({username: 'ali', password: 'password'}));
//    setTimeout(()=> {
//      console.log(store.getState());
//      store.dispatch(actions.getVideos());
//        store.dispatch(actions.getVideo('58e94291b8ec1526789ec5cd'));
//        store.dispatch(actions.rateVideo('58e94291b8ec1526789ec5cd', 1));
//      setTimeout(()=> {
//        console.log(store.getState());
//
//      }, 4000);
//      
//    }, 4000);
//  }, 4000);
//}, 4000);

persistStore(store);

//don't render when running coverage. Karma serves files on its
//server, and there is no reactRoot DOM node for react components to render
const reactRoot = window.document.getElementById("app");
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {getRoutes(store)}
      </Router>
    </Provider>,
    reactRoot);
