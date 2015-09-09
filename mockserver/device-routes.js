var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    device  = require('./device');


var app = module.exports = express.Router();

var jwtCheck = jwt({
    secret: config.secret
});

app.use('/api/devices', jwtCheck);

app.get('/api/devices/tree', function(req, res) {
    res.status(200).send(device.getTree());
});
