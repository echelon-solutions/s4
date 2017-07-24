import { Arguments, Commands } from './commands'

let vorpal = require('vorpal')()

let commands = new Commands()

vorpal
.command('init', 'Creates a new s4 project.')
.option('-n, --name <name>', 'Creates a new directory to use for the project.')
.action(function(args: any) {
  return commands.init(args)
})

vorpal
.command('deploy', 'Deploys the s4 project.')
.action(function(args: any) {
  return commands.deploy()
})

vorpal
.delimiter('s4 | ')
.show()
