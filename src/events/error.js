const colors = require('colors');

module.exports = {
  name: 'error',
  once: false,
  execute(error) {
    console.log(colors.red(`There is an error with Client's websocket ${error}`))
  }
}