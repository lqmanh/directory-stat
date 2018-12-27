const fsModule = require('fs')
let fs = fsModule.promises
if (!fs) {
  const { promisify } = require('util')
  fs = {
    stat: promisify(fsModule.stat),
    writeFile: promisify(fsModule.writeFile),
  }
}
const path = require('path')
const fg = require('fast-glob')

const StatCollectors = require('./stat-collectors')


// Statistics writer
module.exports = class StatWriter {
  constructor(dir, options) {
    this.dir = dir
    const defaultOptions = {
      minified: false,
      output: '.dirstat',
      exclude: [],
      recursive: true,
      statCollectors: [
        new StatCollectors.SizeCollector(),
        new StatCollectors.TimestampCollector(),
        new StatCollectors.TypeCollector(),
      ],
    }
    this.options = Object.assign(defaultOptions, options)
    if (this.options.depth === undefined) this.options.depth = this.options.recursive ? -1 : 0
    if (this.options.depth < 0) this.options.depth = Infinity
    this.statCollectors = [new StatCollectors.PathCollector(), ...this.options.statCollectors]
    this.stat = {}
  }
  // get a path to a directory and return an array of its children stats
  async getStatChildren(pathStr, depth) {
    const children = await fg('*', {
      cwd: pathStr,
      deep: 0,
      dot: true,
      followSymlinkedDirectories: false,
      ignore: this.options.exclude,
      onlyFiles: false,
    })
    const result = children.map(async (child) => await this.getStat(path.join(pathStr, child), depth))
    return Promise.all(result)
  }
  // get a path and depth then return its stat as an object
  async getStat(pathStr, depth) {
    let result = {}
    const stat = await fs.stat(pathStr)
    await Promise.all(
      this.statCollectors.map(async (collector) => result[collector.getName()] = await collector.collect(pathStr, stat))
      )
    if (depth > 0 && stat.isDirectory()) result.children = await this.getStatChildren(pathStr, depth - 1)
    return result
  }
  // get directory statistics and write to .dirstat
  async export() {
    try {
      this.stat = await this.getStat(this.dir, this.options.depth)
      await fs.writeFile(
        path.join(this.dir, this.options.output),
        JSON.stringify(this.stat, null, this.options.minified ? 0 : 2)
      )
    } catch (err) {
      throw err
    }
  }
}
