const path = require('path')

const directoryStat = require('..')


const StatCollector = directoryStat.StatCollector
const StatWriter = directoryStat.StatWriter

class FileContentCollector extends StatCollector {
  constructor(name) {
    super(name)
  }

  async collect(path, stat) {
    if (!stat.isFile()) return undefined
    return 'hello'
  }
}

try {
  const statWriter = new StatWriter(
    path.join(__dirname, 'example'),
    { size: false, type: false, statCollectors: [new FileContentCollector('content')] }
  )
  statWriter.export()
} catch (err) {
  console.err(err)
}
