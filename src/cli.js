const { Command, flags } = require('@oclif/command')
const { StatWriter } = require('.')
const { SizeCollector, TimestampCollector, TypeCollector } = require('./stat-collectors')

class DirectoryStat extends Command {
  async run() {
    const { args, flags } = this.parse(DirectoryStat)
    const { depth, exclude, minified, output, size, timestamp, type } = flags

    if (Number.isNaN(depth)) this.error('-d, --depth expected an integer')

    const statCollectors = []
    if (size) statCollectors.push(new SizeCollector())
    if (timestamp) statCollectors.push(new TimestampCollector())
    if (type) statCollectors.push(new TypeCollector())

    const statWriter = new StatWriter(args.dir, {
      depth,
      exclude,
      minified,
      output,
      statCollectors
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
Fetch directory statistics then write to a JSON file
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
    description: 'path to the output file',
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
