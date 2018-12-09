const fs = require('fs').promises
const path = require('path')
const fg = require('fast-glob')

const PathCollector = require('./stat-collectors/path-collector')


// Statistics writer
module.exports = class StatWriter {
  constructor(dir, options) {
    this.dir = dir
    this.options = Object.assign(
      {
        output: '.dirstat',
        exclude: [],
        recursive: true,
        statCollectors: [new PathCollector()],
      },
      options,
    )
    if (this.options.depth === undefined) this.options.depth = this.options.recursive ? -1 : 0
    if (this.options.depth < 0) this.options.depth = Infinity
    this.statCollectors = this.options.statCollectors
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
      fs.writeFile(path.join(this.dir, this.options.output), JSON.stringify(this.stat, null, 2))
    } catch (err) {
      throw err
    }
  }
}
