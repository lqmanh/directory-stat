const fs = require('fs').promises
const path = require('path')
const fg = require('fast-glob')

const PathCollector = require('./stat-collectors/path-collector')


// Statistics writer
module.exports = class StatWriter {
  constructor(dir, options) {
    this.dir = dir
    this.options = Object.assign({ exclude: [], recursive: true, statCollectors: [new PathCollector()] }, options)
    this.statCollectors = this.options.statCollectors
    this.stat = {}
  }
  // get a path to a directory and return an array of its children stats
  async getStatChildren(pathStr) {
    const children = await fg('*', {
      cwd: pathStr,
      deep: 0,
      dot: true,
      followSymlinkedDirectories: false,
      ignore: this.options.exclude,
      onlyFiles: false,
    })
    const result = children.map(async (child) => await this.getStat(path.join(pathStr, child), { hasChildren: true }))
    return Promise.all(result)
  }
  // get a path and an optional options object and return its stat as an object
  async getStat(path, options={}) {
    let result = {}
    const stat = await fs.stat(path)
    await Promise.all(
      this.statCollectors.map(async (collector) => result[collector.getName()] = await collector.collect(path, stat))
      )
    if (options.hasChildren && stat.isDirectory()) result.children = await this.getStatChildren(path)
    return result
  }
  // get directory statistics and write to .dirstat
  async export() {
    try {
      this.stat = await this.getStat(this.dir, { hasChildren: this.options.recursive })
      fs.writeFile(path.join(this.dir, '.dirstat'), JSON.stringify(this.stat, null, 2))
    } catch (err) {
      throw err
    }
  }
}
