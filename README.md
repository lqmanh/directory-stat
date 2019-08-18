[![](https://img.shields.io/github/license/lqmanh/directory-stat.svg?style=flat-square)](https://github.com/lqmanh/directory-stat)
[![](https://img.shields.io/npm/v/directory-stat.svg?style=flat-square)](https://www.npmjs.com/package/directory-stat)

# directory-stat

> Composable directory statistics fetcher where "fs" is insufficient

## INSTALLATION

### Requirements

- Node.js >= v8.0.0

### Instructions

_Notice:_

- To use **directory-stat** as a standalone CLI app, you should install the package globally.
- To take advantages of all advanced features like custom statistics collectors, you need to use **directory-stat** as a library.

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
  -d, --depth=depth      [default: -1] how deep in directory tree statistics
                         should be fetched. Unlimited if < 0

  -h, --help             show CLI help

  -m, --[no-]minified    minify output

  -o, --output=output    [default: .dirstat] name of the output file

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
const fs = require('fs').promises // Node.js >= 10.0.0
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

const statWriter = new StatWriter(path.join(__dirname, 'example'), {
  depth: 1,
  exclude: ['.dirstat', 'dirstat.json'],
  output: 'dirstat.json',
  statCollectors: [new FileContentCollector()]
})
statWriter.export().then(() => console.log('Done'))
```

## CHANGELOG

Read more [here](https://github.com/lqmanh/directory-stat/blob/master/CHANGELOG.md).

## TODO

Read more [here](https://github.com/lqmanh/directory-stat/blob/master/TODO.md).
