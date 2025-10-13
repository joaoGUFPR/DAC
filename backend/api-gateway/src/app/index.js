require("dotenv-safe").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const httpProxy = require("express-http-proxy");
const app = express();
const helmet = require("helmet");

var http = require("http");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");

app.use ( bodyParser.urlencoded({ extended: false }) );
app.use ( bodyParser.json() );