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
