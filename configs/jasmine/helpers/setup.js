// Tests are placed alongside files under test.
// This file does the following:
// 1. Sets the environment to 'test' so that
//    dev-specific babel config in .babelrc doesn't run.
// 2. Disables Webpack-specific features that Jasmine doesn't understand.
// 3. Registers babel for transpiling our code for testing.
//(4 & 5 are for full-stack code is commented)
// 4. Opens a mongoDB connection if there is no open connection and imports models
// 5. Starts an express server for supertest

// This assures the .babelrc dev config (which includes
// hot module reloading code) doesn't apply for tests.
// Setting NODE_ENV to test instead of production because setting it to production will suppress error messaging
// and propType validation warnings.
process.env.NODE_ENV = 'test';

//require('../../util/mongooseSetup');

//var config = require('../../configs/main.js').default;
//var express = require('express');
//var app = require('../../src/server/app.js').default;
//var request = require('supertest');

// Disable webpack-specific features for tests since
// Jasmine doesn't know what to do with them.
['.css', '.scss', '.png', '.jpg'].forEach(ext => {
  require.extensions[ext] = () => null;
});

// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('babel-register')();

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
//var server = app.listen(config.TEST_PORT, ()=> {
//  console.log(`supertest server started at ${config.TEST_PORT}`)
//});
//global.agent = request.agent(server);
//global.mongoose = mongoose.connect(config.DATA_URL);
//documentRef = document;  //eslint-disable-line no-undef
