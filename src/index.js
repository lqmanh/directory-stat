const { Command, flags } = require('@oclif/command')

const StatWriter = require('./stat-writer')


class DirectoryStatCmd extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStatCmd)
    const { recursive, exclude } = flags
    const statWriter = new StatWriter(args.dir, { recursive, exclude })
    try {
      await statWriter.export()
      this.log('Success')
    } catch (err) {
      this.error(err)
    }
  }
}

DirectoryStatCmd.description = `Get directory statistics where "fs" not available
Save directory statistics as a JSON file named ".dirstat" in that directory
`

DirectoryStatCmd.args = [
  { name: 'dir', required: true, description: 'directory' },
]

DirectoryStatCmd.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  recursive: flags.boolean({
    char: 'r',
    description: 'enable to get statistics of children recursively',
    default: true,
    allowNo: true,
  }),
  exclude: flags.string({
    char: 'x',
    description: 'ignore any children matching this glob',
    multiple: true,
    default: []
  }),
}


module.exports = DirectoryStatCmd
