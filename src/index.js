const { Command, flags } = require('@oclif/command')

const StatWriter = require('./stat-writer')


class DirectoryStatCmd extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStatCmd)
    const { exclude, recursive, size, type } = flags
    const statWriter = new StatWriter(args.dir, { recursive, exclude, size, type })
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
  exclude: flags.string({
    char: 'x',
    description: 'ignore any children matching this glob',
    multiple: true,
    default: [],
  }),
  recursive: flags.boolean({
    char: 'r',
    description: 'get statistics of children recursively',
    default: true,
    allowNo: true,
  }),
  size: flags.boolean({
    description: 'include size information (in bytes)',
    default: true,
    allowNo: true,
  }),
  type: flags.boolean({
    description: 'include object type information',
    default: true,
    allowNo: true,
  }),
}


module.exports = DirectoryStatCmd
