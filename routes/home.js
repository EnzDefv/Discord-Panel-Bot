const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const dateformat = require('dateformat');
const config = require('../config/config.json')
const ver = require('../config/version.json')

const number = require('easy-number-formatter')
var request = require("request");
const jsonfile = require('jsonfile')

const themes = "./config/theme.json"

router.get('/', ensureAuthenticated,(req,res) =>{
    res.redirect('/home')
})

router.get('/home', ensureAuthenticated,(req, res) => {
  var theme = jsonfile.readFileSync(themes);
    var options = {
        method: 'GET',
        url: ``,
        headers: {
          'User-Agent': 'PanelBot',
          useQueryString: true
        }
      }
      // update plików 
      request(options, function (error, response, body) {
        try 
        {
          jsonprased = JSON.parse(body)
          verL = jsonprased.ver
        } 
        catch (e) 
        {
          console.log(chalk.red("Blad zgłoś się do ryby"))
          verL = ver.ver
        }
    res.render('home/home',{
        profile:req.user,
        client:discord.client,
        joinedDate:dateformat(`${discord.client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'),
        prefix:config.prefix,
        number:number,
        Latestversion:verL,
        Currentversion:ver.ver,
        theme:theme
    })
    })
})

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Zalogowano');
    res.redirect('/login');
  });
  
module.exports = router;
