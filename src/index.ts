import { Arguments, Commands } from './commands'

let vorpal = require('vorpal')()

let commands = new Commands()

vorpal
.command('init', 'Create a new s4 project.')
.action(function(args: any, cb: Function) {
  return commands.deploy()
})

vorpal
.command('deploy', 'Deploy the s4 project.')
.action(function(args: any, cb: Function) {
  return commands.deploy()
})

vorpal
.delimiter('s4 | ')
.show()
