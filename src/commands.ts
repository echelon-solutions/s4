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
import * as glob from 'glob'
import * as core from '@echelon-solutions/s4-core/dist'
import * as provider from '@echelon-solutions/s4-core/dist/provider/aws'
import open = require('open')

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
    let self = this
    return Promise
    .resolve()
    .then(function (): Promise<void> {
      let directory = path.resolve('.')
      let schemaFiles: Array<string> = glob.sync('./schemas/*.json', { cwd: directory })
      let specificationFiles: Array<string> = glob.sync('./specifications/*.json', { cwd: directory })
      let resources: Array<core.Resource> = []
      for (let file of schemaFiles) {
        console.log('Adding %s as a deployable schema resource.', file)
        resources.push(new core.Resource(path.basename(file), core.ResourceType.schemas, fs.readFileSync(file, 'utf8'), core.ContentType.JsonSchemaVersion4))
      }
      for (let file of specificationFiles) {
        console.log('Adding %s as a deployable specification resource.', file)
        resources.push(new core.Resource(path.basename(file), core.ResourceType.specifications, fs.readFileSync(file, 'utf8'), core.ContentType.SwaggerVersion2))
      }
      let component = new core.Component('first-time', resources)
      return provider
      .initialize(component)
      .then(function () {
        return provider.deploy(component)
      })
    })
    .then(function () {
      console.log(self.color.green('SUCCESS | Project deployed.'))
      return
    })
    .catch(function (error) {
      console.error(self.color.red(error.message))
      console.error(self.color.red('ERROR | Unable to deploy the project.'))
      return
    })
  }
  docs (): Promise<void> {
    let self = this
    console.log('Opening the s4 documentation in your browser ...')
    return Promise
    .resolve()
    .then(function () {
      open('https://github.com/echelon-solutions/s4/blob/master/README.md')
    })
    .then(function () {
      console.log(self.color.green('SUCCESS | Documentation opened.'))
      return
    })
    .catch(function (error) {
      console.error(self.color.red(error.message))
      console.error(self.color.red('ERROR | Unable to open the documentation.'))
      return
    })
  }
}
