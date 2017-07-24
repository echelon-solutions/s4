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
import * as fs from 'fs'

export interface Options {
  name?: string
  profile?: string
  region?: string
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
    .then(function (): Promise<string> {
      if (args && args.options && args.options.name && args.options.name.length > 0) {
        console.log('Creating project directory [name=%s] ...', args.options.name)
        let directory = path.resolve(args.options.name)
        fs.mkdirSync(directory)
        console.log('Project directory created [name=%s].', args.options.name)
        return Promise.resolve(directory)
      }
      console.log('Using the current directory for the project ...')
      return Promise.resolve(path.resolve('.'))
    })
    .then(function (directory: string): Promise<void> {
      console.log('Creating the project sub-directories ...')
      let folders: Array<string> = [ 'schemas', 'scenarios', 'specifications', 'services' ]
      for (let folder of folders) {
        fs.mkdirSync(path.resolve(directory + '/' + folder))
      }
      console.log('Project sub-directories created.')
      return Promise.resolve()
    })
    .then(function () {
      console.log(self.color.green('SUCCESS | Project initialized.'))
      return
    })
    .catch(function (error) {
      console.error(self.color.red(error.message))
      console.error(self.color.red('ERROR | Unable to initialize the project.'))
      return
    })
  }
  deploy (): Promise<void> {
    return Promise
    .resolve()
  }
}
