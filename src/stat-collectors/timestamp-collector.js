const StatCollector = require('./stat-collector')

/**
 * Collect timestamp information (atime, birthtime, ctime, mtime)
 */
class TimestampCollector extends StatCollector {
  constructor() {
    super('timestamp')
  }

  async collect(path, stat) {
    return {
      atime: stat.atime,
      birthtime: stat.birthtime,
      ctime: stat.ctime,
      mtime: stat.mtime
    }
  }
}

module.exports = TimestampCollector
