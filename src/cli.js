const { Command, flags } = require('@oclif/command')

const PathCollector = require('./stat-collectors/path-collector')
const StatWriter = require('./stat-writer')


class DirectoryStat extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStat)
    const { exclude, recursive, size, timestamp, type } = flags
    const statCollectors = [new PathCollector()]
    if (size) {
      const SizeCollector = require('./stat-collectors/size-collector')
      statCollectors.push(new SizeCollector())
    }
    if (timestamp) {
      const TimestampCollector = require('./stat-collectors/timestamp-collector')
      statCollectors.push(new TimestampCollector())
    }
    if (type) {
      const TypeCollector = require('./stat-collectors/type-collector')
      statCollectors.push(new TypeCollector())
    }
    const statWriter = new StatWriter(args.dir, { exclude, recursive, statCollectors })
    try {
      await statWriter.export()
      this.log('Success')
    } catch (err) {
      this.error(err)
    }
  }
}

DirectoryStat.description = `Composable directory statistics fetcher where "fs" insufficient
Fetch directory statistics then save to a JSON file named ".dirstat" in that directory
`

DirectoryStat.args = [
  { name: 'dir', required: true, description: 'directory' },
]

DirectoryStat.flags = {
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
  timestamp: flags.boolean({
    description: 'include timestamp information',
    default: true,
    allowNo: true,
  }),
  type: flags.boolean({
    description: 'include object type information',
    default: true,
    allowNo: true,
  }),
}


module.exports = DirectoryStat
