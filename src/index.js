const { Command, flags } = require('@oclif/command')

const StatWriter = require('./stat-writer')


class DirectoryStatCmd extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStatCmd)
    const statWriter = new StatWriter(args.dir, { recursive: flags.recursive })
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
    description: 'enable to get statistics recursively',
    default: true,
    allowNo: true,
  }),
}


module.exports = DirectoryStatCmd
