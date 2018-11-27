const fs = require('fs')
const path = require('path')


module.exports = class StatWriter {
  constructor(dir) {
    this.dir = dir
    this.stat = {
      children: []
    }
  }

  parse() {
    try {
      const dirents = fs.readdirSync(this.dir, { withFileTypes: true })
      for (let dirent of dirents) {
        if (dirent.isFile()) {
          this.stat.children.push({ name: dirent.name, type: 'file' })
        } else if (dirent.isDirectory()) {
          this.stat.children.push({ name: dirent.name, type: 'directory' })
        } else if (dirent.isSymbolicLink()) {
          this.stat.children.push({ name: dirent.name, type: 'symbolic link' })
        }
      }
    } catch (err) {
      throw err
    }
  }

  write() {
    this.parse()
    fs.writeFile(path.join(this.dir, '.dirstat'), JSON.stringify(this.stat, null, 2), (err) => {
      if (err) throw err
      console.log('Success')
    })
  }
}
