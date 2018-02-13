var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');
require('request-debug')(request);

var server = require('http').Server(app);

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});