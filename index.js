const express = require('express')
const discord = require('./bot')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const config = require('./config/config.json')

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
