const { Command, flags } = require('@oclif/command')

const statCollectors = require('./stat-collectors')
const { SizeCollector, TimestampCollector, TypeCollector } = statCollectors
const StatWriter = require('./stat-writer')

class DirectoryStat extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStat)
    const { depth, exclude, minified, output, size, timestamp, type } = flags

    if (Number.isNaN(depth))
      this.error('-d, --depth expected an integer, not NaN')

    const collectors = []
    if (size) collectors.push(new SizeCollector())
    if (timestamp) collectors.push(new TimestampCollector())
    if (type) collectors.push(new TypeCollector())

    const statWriter = new StatWriter(args.dir, {
      depth,
      exclude,
      minified,
      output,
      statCollectors: collectors
    })
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

DirectoryStat.args = [{ name: 'dir', required: true, description: 'directory' }]

DirectoryStat.flags = {
  depth: flags.string({
    char: 'd',
    description:
      'how deep in directory tree statistics should be fetched. Unlimited if < 0',
    default: -1,
    parse: (input) => parseInt(input)
  }),
  help: flags.help({ char: 'h' }),
  minified: flags.boolean({
    char: 'm',
    description: 'minify output',
    default: false,
    allowNo: true
  }),
  output: flags.string({
    char: 'o',
    description: 'name of the output file',
    default: '.dirstat'
  }),
  version: flags.version({ char: 'v' }),
  exclude: flags.string({
    char: 'x',
    description: 'ignore any children matching this glob',
    multiple: true,
    default: []
  }),
  size: flags.boolean({
    description: 'include size (in bytes)',
    default: true,
    allowNo: true
  }),
  timestamp: flags.boolean({
    description: 'include timestamp',
    default: true,
    allowNo: true
  }),
  type: flags.boolean({
    description: 'include type',
    default: true,
    allowNo: true
  })
}

module.exports = DirectoryStat
