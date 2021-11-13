const passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;
const config = require('../config/config.json')

module.exports = function(passport) {
    var scopes = ['identify', 'email', 'guilds', 'guilds.join'];
 
    passport.use(new DiscordStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        scope: scopes
    },
    function(accessToken, refreshToken, profile, cb) {
        if(config.Admin.includes(profile.id)){
            return cb(null, profile);
        }else{
            return cb(null, false, { message: 'Błąd podaj clientID bota w config.json!' })
        }
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}
