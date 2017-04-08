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
//import {getRoutes} from './routes';
import 'bootstrap/dist/css/bootstrap.css';
require("font-awesome-webpack");

const store = configureStore();
store.dispatch(actions.login({username: 'ali', password: 'password'}));
setTimeout(()=> {
  console.log(store.getState());
  store.dispatch(actions.logout());
  setTimeout(()=> {
    console.log(store.getState());
    store.dispatch(actions.login({username: 'ali', password: 'password'}));
    setTimeout(()=> {
      console.log(store.getState());
      store.dispatch(actions.getVideos());
        store.dispatch(actions.getVideo('58e94291b8ec1526789ec5cd'));
        store.dispatch(actions.rateVideo('58e94291b8ec1526789ec5cd', 1));
      setTimeout(()=> {
        console.log(store.getState());

      }, 4000);
      
    }, 4000);
  }, 4000);
}, 4000);
//console.log(store.getState());
//console.log(store.getState());
//console.log(store.getState());
//persistStore(store);

//don't render when running coverage
const reactRoot = window.document.getElementById("app");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    reactRoot);
