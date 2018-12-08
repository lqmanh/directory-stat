const fs = require('fs').promises
const path = require('path')

const StatCollector = require('./stat-collector')


module.exports = class SizeCollector extends StatCollector {
  constructor() {
    super('size')
  }

  async collect(pathStr, stat) {
    if (!stat) stat = await fs.stat(pathStr)
    if (stat.isFile()) return stat.size
    if (!stat.isDirectory()) return 0

    const children = await fs.readdir(pathStr)
    return children.reduce(async (accum, child) => {
      const size = await this.collect(path.join(pathStr, child), null)
      return (await accum) + size
    }, 0)
  }
}
