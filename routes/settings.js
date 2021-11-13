const express = require('express');
const router = express.Router();
const discord = require('../bot')
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const config = require('../config/config.json')
const version = require('../config/version.json')

json = require('json-update');
const jsonfile = require('jsonfile')
const file = "./config/config.json"
const themes = "./config/theme.json"

const fs = require("fs");

router.get('/settings', ensureAuthenticated,(req, res) => {
    var config = jsonfile.readFileSync(file);
    var theme = jsonfile.readFileSync(themes);
    fs.readdir("./themes/", (err, files) => {
    res.render('home/settings',{
        profile:req.user,
        client:discord.client,
        config:config,
        version:version,
        themeName:files,
        theme:theme
    })
    })
})

router.post('/settings/config',ensureAuthenticated,(req,res) =>{
    json.update('./config/config.json',{clientID:`${req.body.clientID}`,clientSecret:`${req.body.clientSecret}`,callbackURL:`${req.body.callbackURL}`,Admin:req.body.admin.split(','),token:`${req.body.token}`,prefix:`${req.body.prefix}`,port:`${req.body.port}`}).then(function(dat) { 
        req.flash('success', 'Config został załadowany, zresetuj projekt!')
        res.redirect('/settings')
    })
})

router.post('/settings/dashboard',ensureAuthenticated,(req,res) =>{
    json.update('./config/theme.json',{theme:`${req.body.theme}`}).then(function(dat) { 
        req.flash('success', 'Tło załadowanie!')
        res.redirect('/settings')
    })
})

router.post('/settings/upload/theme', ensureAuthenticated,function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return req.flash('error', `Żaden plik nie został przesłany, spróbuj ponownie!`), 
      res.redirect('/settings')
    }
    if(!req.files.sampleFile.name.endsWith(".css")){
      return req.flash('error', `Proszę prześlij plik css!`), 
      res.redirect('/settings')
    }
    const path = './themes/' + req.files.sampleFile.name
    if(fs.existsSync(path)) {
      return req.flash('error', `Tło o takiej nazwie już istnieje!`), 
      res.redirect('/settings')
    }

    sampleFile = req.files.sampleFile;
    uploadPath = './themes/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
        req.flash('success', `Tlo ${sampleFile.name} zostało pomyślnie wysłane!`)
        res.redirect('/settings')
    });
});
  
module.exports = router;
