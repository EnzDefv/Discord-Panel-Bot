const chalk = require("chalk")
const config = require("../config/config.json")
const vers = require("../config/version.json")
const discord = require('../bot')
var figlet = require('figlet');
const lolcatjs = require('lolcatjs');

module.exports = (client) => {
    console.clear()
    var banner = figlet.textSync('Discord Bot Panel', {
        font: 'Small',
        horizontalLayout: 'default',
        width: 1000,
        whitespaceBreak: true
    });
    lolcatjs.fromString(banner);
    console.log(chalk.bold.green('Uruchomiono bota...'))
    console.log(chalk.magenta('Wersja:'),chalk.cyan(`${vers.ver}`))
    console.log(chalk.magenta('Tworca:'),chalk.cyan('RybaA'))
    console.log(chalk.magenta('Prefix:'),chalk.cyan(`${config.prefix}\n`))
    console.log(chalk.green(chalk.bold(`${discord.client.user.username}`),`jest online!`))
    console.log(chalk.green(chalk.bold(`Panel:`),`http://localhost:`+config.port))

 
};

