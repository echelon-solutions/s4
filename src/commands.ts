/*
 * Imports
 *
 * Using the ShellJS library, to provide portable Unix shell
 *   commands for Node.js. Read more at:
 *   http://shelljs.org
 */
import * as path from 'path'
import * as shell from 'shelljs'
import * as chalk from 'chalk'

export interface Options {
  profile?: string
  region?: string
  stack?: string
  bucket?: string
  parameters?: string
}

export interface Arguments {
  options?: Options
}

export class Commands {
  color: chalk.Chalk
  constructor () {
    this.color = new chalk.constructor({ enabled: true })
  }
  init (args: Arguments): Promise<void> {
    let self = this
    return Promise
    .resolve()
    .then(function () {
      if (!args || !args.options || Object.keys(args.options).length === 0) {
        throw new Error('ERROR | The [init] command requires arguments to be supplied.')
      }
      console.log(self.color.green('SUCCESS | Project initialized.'))
      return
    })
    .catch(function (error) {
      console.error(self.color.red('ERROR | Unable to initialize the project.'))
      console.error(self.color.red(error.message))
      return
    })
  }
  deploy (): Promise<void> {
    return Promise
    .resolve()
  }
}
