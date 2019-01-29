const path = require('path')

const StatCollector = require('./stat-collector')

module.exports = class PathCollector extends StatCollector {
  constructor() {
    super('path')
  }

  async collect(pathStr) {
    return path.parse(path.resolve(pathStr))
  }
}
