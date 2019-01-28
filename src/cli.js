const { Command, flags } = require('@oclif/command')

const StatCollectors = require('./stat-collectors')
const StatWriter = require('./stat-writer')


class DirectoryStat extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStat)
    const { depth, exclude, minified, output, recursive, size, timestamp, type } = flags

    if (Number.isNaN(depth)) this.error('-d, --depth expected an integer, not NaN')

    const statCollectors = []
    if (size) statCollectors.push(new StatCollectors.SizeCollector())
    if (timestamp) statCollectors.push(new StatCollectors.TimestampCollector())
    if (type) statCollectors.push(new StatCollectors.TypeCollector())

    const statWriter = new StatWriter(args.dir, { depth, exclude, minified, output, recursive, statCollectors })
    try {
      await statWriter.export()
      this.log('Success')
    } catch (err) {
      this.error(err)
    }
  }
}

DirectoryStat.description = `Composable directory statistics fetcher where "fs" is insufficient
Fetch directory statistics then save to a JSON file in that directory
`

DirectoryStat.args = [
  { name: 'dir', required: true, description: 'directory' },
]

DirectoryStat.flags = {
  depth: flags.string({
    char: 'd',
    description: 'how deep in directory tree statistics should be fetched. Unlimited if < 0',
    parse: (input) => parseInt(input),
  }),
  help: flags.help({ char: 'h' }),
  minified: flags.boolean({
    char: 'm',
    description: 'minify output',
    default: false,
    allowNo: true,
  }),
  output: flags.string({
    char: 'o',
    description: 'name of the output file',
    default: '.dirstat',
  }),
  recursive: flags.boolean({
    char: 'r',
    description: '[DEPRECATED] get statistics of children recursively. This is overwritten by depth option',
    default: true,
    allowNo: true,
  }),
  version: flags.version({ char: 'v' }),
  exclude: flags.string({
    char: 'x',
    description: 'ignore any children matching this glob',
    multiple: true,
    default: [],
  }),
  size: flags.boolean({
    description: 'include size (in bytes)',
    default: true,
    allowNo: true,
  }),
  timestamp: flags.boolean({
    description: 'include timestamp',
    default: true,
    allowNo: true,
  }),
  type: flags.boolean({
    description: 'include type',
    default: true,
    allowNo: true,
  }),
}


module.exports = DirectoryStat
