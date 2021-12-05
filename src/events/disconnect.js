const colors = require('colors');

module.exports = {
  name: 'disconnect',
  once: false,
  execute(client) {
    console.log(colors.magenta('Websocket has disconnected'))
  }
}