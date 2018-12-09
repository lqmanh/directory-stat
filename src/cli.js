const { Command, flags } = require('@oclif/command')

const StatCollectors = require('./stat-collectors')
const StatWriter = require('./stat-writer')


class DirectoryStat extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStat)
    const { depth, exclude, output, recursive, size, timestamp, type } = flags

    if (Number.isNaN(depth)) this.error('-d, --depth expected an integer, not NaN')

    const statCollectors = [new StatCollectors.PathCollector()]
    if (size) statCollectors.push(new StatCollectors.SizeCollector())
    if (timestamp) statCollectors.push(new StatCollectors.TimestampCollector())
    if (type) statCollectors.push(new StatCollectors.TypeCollector())

    const statWriter = new StatWriter(args.dir, { depth, exclude, output, recursive, statCollectors })
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
  output: flags.string({
    char: 'o',
    description: 'name of the output file',
    default: '.dirstat',
  }),
  exclude: flags.string({
    char: 'x',
    description: 'ignore any children matching this glob',
    multiple: true,
    default: [],
  }),
  depth: flags.string({
    char: 'd',
    description: 'how deep in directory tree statistics should be fetched. Negative integer means unlimited',
    parse: (input) => parseInt(input),
  }),
  recursive: flags.boolean({
    char: 'r',
    description: '[DEPRECATED] get statistics of children recursively. This is overwritten by depth option',
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
