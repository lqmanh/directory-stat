const StatCollector = require('./stat-collector')

/**
 * Collect type information
 */
class TypeCollector extends StatCollector {
  constructor() {
    super('type')
  }

  async collect(path, stat) {
    if (stat.isBlockDevice()) return 'block device'
    else if (stat.isCharacterDevice()) return 'character device'
    else if (stat.isDirectory()) return 'directory'
    else if (stat.isFIFO()) return 'fifo pipe'
    else if (stat.isFile()) return 'file'
    else if (stat.isSocket()) return 'socket'
    else if (stat.isSymbolicLink()) return 'symbolic link'
    return undefined
  }
}

module.exports = TypeCollector
