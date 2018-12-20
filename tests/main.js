const fsModule = require('fs')
let fs = fsModule.promises
if (!fs) {
  const { promisify } = require('util')
  fs = {
    readFile: promisify(fsModule.readFile),
  }
}
const path = require('path')

const directoryStat = require('..')


const StatCollector = directoryStat.StatCollectors.StatCollector
const StatWriter = directoryStat.StatWriter

class FileContentCollector extends StatCollector {
  constructor() {
    super('content')
  }

  async collect(pathStr, stat) {
    if (!stat.isFile()) return undefined
    return fs.readFile(pathStr, { encoding: 'utf8' })
  }
}

try {
  const statWriter = new StatWriter(
    path.join(__dirname, 'example'),
    {
      depth: 1,
      exclude: ['.dirstat', 'dirstat.json'],
      output: 'dirstat.json',
      statCollectors: [new FileContentCollector()]
    },
  )
  statWriter.export()
} catch (err) {
  console.err(err)
}
