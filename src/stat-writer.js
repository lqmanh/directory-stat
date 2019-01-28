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

const statCollectors = require('./stat-collectors')


/**
 * Statistics writer
 */
class StatWriter {
  /**
   * Constructor
   * @param {string} dir - Path to a directory
   * @param {Object} options - Options
   */
  constructor(dir, options) {
    /**
     * @private
     * @type {string}
     */
    this.dir = dir
    /**
     * @private
     * @type {Object}
     */
    this.options = Object.assign({
      depth: -1,
      exclude: [],
      minified: false,
      output: '.dirstat',
      statCollectors: [
        new statCollectors.SizeCollector(),
        new statCollectors.TimestampCollector(),
        new statCollectors.TypeCollector()
      ]
    }, options)
    if (this.options.depth < 0) this.options.depth = Infinity
    /**
     * @private
     * @type {Array<StatCollector>}
     */
    this.statCollectors = [new statCollectors.PathCollector(), ...this.options.statCollectors]
    /**
     * @private
     * @type {Object}
     */
    this.stat = {}
  }

  /**
   * Get a directory's children statistics
   * @private
   * @param {string} pathStr - Path to a directory
   * @param {number} depth - Depth
   * @return {Promise<Array<Object>>} Directory's children statistics
   */
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

  /**
   * Get a directory statistics
   * @private
   * @param {string} pathStr - Path to a directory
   * @param {number} depth - Depth
   * @return {Promise<Object>} Directory statistics
   */
  async getStat(pathStr, depth) {
    const result = {}
    const stat = await fs.stat(pathStr)
    await Promise.all(
      this.statCollectors.map(async (collector) => result[collector.getName()] = await collector.collect(pathStr, stat))
      )
    if (depth > 0 && stat.isDirectory()) result.children = await this.getStatChildren(pathStr, depth - 1)
    return result
  }

  /**
   * Get a directory statistics and write to a file
   */
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

module.exports = StatWriter
