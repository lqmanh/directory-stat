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

  async getStatChildren(name) {
    let children = await fs.readdir(name)
    children = children.map(async (child) => await this.getStat(path.join(name, child), { hasChildren: this.options.recursive }))
    return await Promise.all(children)
  }

  async getStat(name, options={}) {
    let result = {}
    result.path = this.parsePath(name)
    const stat = await fs.stat(name)
    result.timestamp = {
      atime: stat.atime,
      birthtime: stat.birthtime,
      ctime: stat.ctime,
      mtime: stat.mtime,
    }
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
