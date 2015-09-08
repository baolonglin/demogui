var express = require('express'),
    _       = require('lodash'),
    config  = require('./config');


var app = module.exports = express.Router();

var deviceTree = [];

app.get('/devices/tree', function(req, res) {
    
});
