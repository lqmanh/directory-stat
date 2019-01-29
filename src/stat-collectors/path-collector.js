const path = require('path')

const StatCollector = require('./stat-collector')

/**
 * Collect path information
 */
class PathCollector extends StatCollector {
  constructor() {
    super('path')
  }

  async collect(pathStr) {
    return path.parse(path.resolve(pathStr))
  }
}

module.exports = PathCollector
