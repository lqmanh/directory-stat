const StatCollector = require('./stat-collector')

module.exports = class TimestampCollector extends StatCollector {
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
