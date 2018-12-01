const fs = require('fs').promises
const path = require('path')


// Statistics writer
module.exports = class StatWriter {
  constructor(dir, options) {
    this.dir = dir
    this.options = options
    this.stat = {}
  }
  // get a path and return an object containing path info (dir, root, base, name, ext)
  parsePath(name) {
    return path.parse(path.resolve(name))
  }
  // get an fs.Stats instance and return an object containing timestamp info (atime, birthtime, ctime, mtime)
  parseTimestamp(stat) {
    return {
      atime: stat.atime,
      birthtime: stat.birthtime,
      ctime: stat.ctime,
      mtime: stat.mtime,
    }
  }
  // get an fs.Stats instance and return type of the object as a string
  parseType(stat) {
    if (stat.isBlockDevice()) return 'block device'
    else if (stat.isCharacterDevice()) return 'character device'
    else if (stat.isDirectory()) return 'directory'
    else if (stat.isFIFO()) return 'fifo pipe'
    else if (stat.isFile()) return 'file'
    else if (stat.isSocket()) return 'socket'
    else if (stat.isSymbolicLink()) return 'symbolic link'
    return undefined
  }
  // get a path and return size of the object as a number. Size of a file is its fs.Stats.size,
  // size of a directory is the total size of its descendants, size of the others is 0
  async parseSize(name) {
    const stat = await fs.stat(name)
    if (stat.isFile()) return stat.size
    if (!stat.isDirectory()) return 0
    const children = await fs.readdir(name)
    return children.reduce(async (accum, child) => {
      const size = await this.parseSize(path.join(name, child))
      return (await accum) + size
    }, 0)
  }
  // get a path to a directory and return an array of its children stats
  async getStatChildren(name) {
    const children = await fs.readdir(name)
    const result = children.map(async (child) => await this.getStat(path.join(name, child), { hasChildren: this.options.recursive }))
    return Promise.all(result)
  }
  // get a path and an optional options object and return its stat as an object
  async getStat(name, options={}) {
    let result = {}

    result.path = this.parsePath(name)

    const stat = await fs.stat(name)
    result.timestamp = this.parseTimestamp(stat)
    result.type = this.parseType(stat)
    if (options.hasChildren && result.type === 'directory') result.children = await this.getStatChildren(name)
    result.size = await this.parseSize(name)

    return result
  }
  // get directory statistics and write to .dirstat
  async export() {
    try {
      this.stat = await this.getStat(this.dir, { hasChildren: true })
      fs.writeFile(path.join(this.dir, '.dirstat'), JSON.stringify(this.stat, null, 2))
    } catch (err) {
      throw err
    }
  }
}
