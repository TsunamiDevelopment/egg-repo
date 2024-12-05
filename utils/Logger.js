const chalk = require('chalk')

const error = (msg) => console.log(chalk.redBright('[') + chalk.redBright.bold("ERROR") + chalk.redBright('] ') + chalk.red(msg))
const warn = (msg) => console.log(chalk.yellowBright('[') + chalk.yellowBright.bold("WARN") + chalk.yellowBright('] ') + chalk.white(msg))
const info = (msg) => console.log(chalk.blueBright('[') + chalk.blueBright.bold("INFO") + chalk.blueBright('] ') + chalk.white(msg))
const success = (msg) => console.log(chalk.greenBright('[') + chalk.greenBright.bold("SUCCESS") + chalk.greenBright('] ' ) + chalk.white(msg))
const debug = (msg) => console.log(chalk.gray('[') + chalk.gray.bold("DEBUG") + chalk.gray('] ') + chalk.gray(msg))
const sentryNotif = (msg) => console.log(chalk.magentaBright('[') + chalk.magentaBright.bold("SENTRY") + chalk.magentaBright('] ') + chalk.magenta(msg))

module.exports = { error, warn, info, success, debug, sentryNotif }