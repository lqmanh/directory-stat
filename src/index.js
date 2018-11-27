const { Command, flags } = require('@oclif/command')


class DirectoryStatCommand extends Command {
  async run() {
    const { flags } = this.parse(DirectoryStatCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/index.js`)
  }
}

DirectoryStatCommand.description = `Describe the command here
Extra documentation goes here
`

DirectoryStatCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),

  name: flags.string({char: 'n', description: 'name to print'}),
}


module.exports = DirectoryStatCommand
