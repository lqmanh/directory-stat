const fs = require('fs').promises
const path = require('path')


module.exports = class StatWriter {
  constructor(dir) {
    this.dir = dir
    this.stat = {}
  }

  parsePath(name) {
    return path.parse(path.resolve(name))
  }

  async parseChildren(name) {
    let children = await fs.readdir(name)
    children = children.map(async (child) => await this.parse(path.join(name, child), { hasChildren: true }))
    return await Promise.all(children)
  }

  async parse(name, options={}) {
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
    result.children = await this.parseChildren(name)
    return result
  }

  async export() {
    try {
      this.stat = await this.parse(this.dir, { hasChildren: true })
      fs.writeFile(path.join(this.dir, '.dirstat'), JSON.stringify(this.stat, null, 2))
    } catch (err) {
      throw err
    }
  }
}
