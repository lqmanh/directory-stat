const fs = require('fs').promises
const path = require('path')


module.exports = class StatWriter {
  constructor(dir) {
    this.dir = dir
    this.stat = {
      name: this.dir,
      children: []
    }
  }

  async parse() {
    try {
      const names = await fs.readdir(this.dir)
      for (let name of names) {
        const stat = await fs.stat(path.join(this.dir, name))
        const child = {
          name,
          timestamp: {
            atime: stat.atime,
            ctime: stat.ctime,
            mtime: stat.mtime,
            birthtime: stat.birthtime,
          }
        }
        if (stat.isDirectory()) child.type = 'directory'
        else if (stat.isFile()) child.type = 'file'
        else if (stat.isSymbolicLink()) child.type = 'symbolic link'

        this.stat.children.push(child)
      }
    } catch (err) {
      throw err
    }
  }

  async export() {
    try {
      await this.parse()
      fs.writeFile(path.join(this.dir, '.dirstat'), JSON.stringify(this.stat, null, 2))
    } catch (err) {
      throw err
    }
  }
}
