[![License](https://img.shields.io/npm/l/directory-stat.svg)](https://github.com/lqmanh/directory-stat/blob/master/package.json)
[![Version](https://img.shields.io/npm/v/directory-stat.svg)](https://npmjs.org/package/directory-stat)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

# directory-stat
> Composable directory statistics fetcher where "fs" insufficient

## INSTALLATION
*Notice:*
- 0.2.x is the latest stable branch.
- 0.1.x is early-access branch. Hence, the functionalities and API are likely to have breaking changes, even in minor and patch releases.

### Requirements
- Node.js >= v10.0.0

### Instructions
*Notice:*
- To use **directory-stat** as a standalone CLI app, you need to install the package globally.

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
```
$ directory-stat --help
Composable directory statistics fetcher where "fs" insufficient

USAGE
  $ directory-stat DIR

ARGUMENTS
  DIR  directory

OPTIONS
  -h, --help             show CLI help
  -r, --[no-]recursive   get statistics of children recursively
  -v, --version          show CLI version
  -x, --exclude=exclude  [default: ] ignore any children matching this glob
  --[no-]size            include size information (in bytes)
  --[no-]timestamp       include timestamp information
  --[no-]type            include object type information

DESCRIPTION
  Fetch directory statistics then save to a JSON file named ".dirstat" in that directory
```

### As a Library
Consult [this example](https://github.com/lqmanh/directory-stat/blob/master/tests/main.js).

## CHANGELOG
See more [here](https://github.com/lqmanh/directory-stat/blob/master/CHANGELOG.md).
