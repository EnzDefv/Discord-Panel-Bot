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

port = config.port;

app.use(express.static('./public'));
app.use(express.static('./themes'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true,limit: '5mb' }));
app.use(fileUpload());

require('./auth/passport')(passport);


// Konfiguracja strony
app.use(
    session({
      secret: 'secret-clientkod',
      resave: true,
      saveUninitialized: true
    })
);
  
// analizowanie 
app.use(passport.initialize());
app.use(passport.session());

// szybkie połączenie
app.use(flash());

// globalne zmienne 
app.use(function(req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/home.js'));
app.use('/', require('./routes/settings.js'));
app.use('/', require('./routes/guilds.js'));
app.use('/', require('./routes/support.js'));
app.use('/', require('./routes/plugins.js'));

app.use('/login', require('./routes/login.js'));

http.listen(port)

io.sockets.on('connection', function(sockets){
  setInterval(function(){ 
    // Uptime 
    let days = Math.floor(discord.client.uptime / 86400000);
    let hours = Math.floor(discord.client.uptime / 3600000) % 24;
    let minutes = Math.floor(discord.client.uptime / 60000) % 60;
    let seconds = Math.floor(discord.client.uptime / 1000) % 60;
  
    var BOTuptime = `${days}d ${hours}h ${minutes}m ${seconds}s` 
    
    // uptime bota 
    sockets.emit('uptime',{uptime:BOTuptime}); }, 1000);
})

// Error strony
app.use(function(req,res){
  res.status(404).render('error_pages/404');
});

const mongoose = require("mongoose");

mongoose.connect('mongodburl', {

    useNewUrlParser: true,

    useUnifiedTopology: true,

    useFindAndModify: true

  })

  .then(() => {

    console.log('Połączono z bazą danych.');

  })

  .catch((err) => {

    console.log(err);

  })

