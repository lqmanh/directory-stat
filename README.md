[![License](https://img.shields.io/npm/l/directory-stat.svg)](https://github.com/lqmanh/directory-stat)
[![Version](https://img.shields.io/npm/v/directory-stat.svg)](https://npmjs.org/package/directory-stat)

# directory-stat
> Composable directory statistics fetcher where "fs" is insufficient

## INSTALLATION
*Notice:*
- 0.6.x is the latest stable branch.
- 0.1.x is early-access branch. Hence, the functionalities and API are likely to have breaking changes, even in minor and patch releases.

### Requirements
- Node.js >= v8.0.0

### Instructions
*Notice:*
- To use **directory-stat** as a standalone CLI app, you should install the package globally.
- To use all advanced features like custom statistics collectors, you need to use this package as a library.

#### With `npm`
```
$ npm install directory-stat
```
or
```
$ npm install -g directory-stat
```

#### With `yarn`
```
$ yarn add directory-stat
```
or
```
$ yarn global add directory-stat
```

## USAGE
### As a Standalone CLI App
Use `-h, --help` flag to see more:
```bash
$ directory-stat --help
Composable directory statistics fetcher where "fs" is insufficient

USAGE
  $ directory-stat DIR

ARGUMENTS
  DIR  directory

OPTIONS
  -d, --depth=depth      how deep in directory tree statistics should be fetched.
                         Unlimited if < 0

  -h, --help             show CLI help

  -m, --[no-]minified    minify output

  -o, --output=output    [default: .dirstat] name of the output file

  -r, --[no-]recursive   [DEPRECATED] get statistics of children recursively.
                         This is overwritten by depth option

  -v, --version          show CLI version

  -x, --exclude=exclude  [default: ] ignore any children matching this glob

  --[no-]size            include size (in bytes)

  --[no-]timestamp       include timestamp

  --[no-]type            include type

DESCRIPTION
  Fetch directory statistics then save to a JSON file in that directory
```

### As a Library
Example:
```javascript
const fsModule = require('fs')
let fs = fsModule.promises
if (!fs) {
  const { promisify } = require('util')
  fs = { readFile: promisify(fsModule.readFile) }
}
const path = require('path')

const { StatWriter } = require('directory-stat')
const { StatCollector } = require('directory-stat/stat-collectors')


class FileContentCollector extends StatCollector {
  constructor() {
    super('content')
  }

  async collect(pathStr, stat) {
    if (!stat.isFile()) return undefined
    return fs.readFile(pathStr, { encoding: 'utf8' })
  }
}

const statWriter = new StatWriter(
  path.join(__dirname, 'example'),
  {
    depth: 1,
    exclude: ['.dirstat', 'dirstat.json'],
    output: 'dirstat.json',
    statCollectors: [new FileContentCollector()]
  },
)
statWriter.export().then(_ => console.log('Done'))
```

## CHANGELOG
Read more [here](https://github.com/lqmanh/directory-stat/blob/master/CHANGELOG.md).

## TODO
Read more [here](https://github.com/lqmanh/directory-stat/blob/master/TODO.md).
