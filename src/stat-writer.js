const fs = require('fs').promises
const path = require('path')


module.exports = class StatWriter {
  constructor(dir, options) {
    this.dir = dir
    this.options = options
    this.stat = {}
  }

  parsePath(name) {
    return path.parse(path.resolve(name))
  }

  parseTimestamp(stat) {
    return {
      atime: stat.atime,
      birthtime: stat.birthtime,
      ctime: stat.ctime,
      mtime: stat.mtime,
    }
  }

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

  async getStatChildren(name) {
    let children = await fs.readdir(name)
    children = children.map(async (child) => await this.getStat(path.join(name, child), { hasChildren: this.options.recursive }))
    return await Promise.all(children)
  }

  async getStat(name, options={}) {
    let result = {}

    result.path = this.parsePath(name)

    const stat = await fs.stat(name)
    result.timestamp = this.parseTimestamp(stat)
    result.type = this.parseType(stat)

    if (!stat.isDirectory() || !options.hasChildren) return result
    result.children = await this.getStatChildren(name)
    return result
  }

  async export() {
    try {
      this.stat = await this.getStat(this.dir, { hasChildren: true })
      fs.writeFile(path.join(this.dir, '.dirstat'), JSON.stringify(this.stat, null, 2))
    } catch (err) {
      throw err
    }
  }
}
