// To use .env
require('dotenv').config();
// Get dependencies
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

// Get our API routes
const places = require('./routes/places');

var app = express();

/**
 * INITIAL CONFIGURATIONS
 */

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * ROUTES
 */

const versionApi = '/v1';

app.use(versionApi + '/places', places);

/**
 * INTIALIZE SERVER
 */

// Get port from environment and store in Express
const port = process.env.SERVER_PORT;
app.set('port', port);

// Create HTTP sever
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);

module.exports.app = app;