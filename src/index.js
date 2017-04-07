// Set up your application entry point here...
import configureStore from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import {Router, browserHistory} from 'react-router';
import App from './components/App';
import './index.css';
//import {getRoutes} from './routes';
import 'bootstrap/dist/css/bootstrap.css';
require("font-awesome-webpack");

const store = configureStore();
persistStore(store);
const reactRoot = window.document.getElementById("app");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    reactRoot);
