[![License](https://img.shields.io/npm/l/directory-stat.svg)](https://github.com/lqmanh/directory-stat/blob/master/package.json)
[![Version](https://img.shields.io/npm/v/directory-stat.svg)](https://npmjs.org/package/directory-stat)
[![Downloads/week](https://img.shields.io/npm/dw/directory-stat.svg)](https://npmjs.org/package/directory-stat)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

# directory-stat
> Get directory statistics where "fs" not available

## INSTALLATION
***Notice**: 0.1.x is early-access branch. Hence, the functionalities and API are likely to have breaking changes, even in minor and patch releases.*

### Requirements
- Node.js >= v10.0.0

### Instructions
To use **directory-stat** as a CLI app, you need to install the package globally

#### With `npm`
```
$ npm install -g directory-stat
```

#### With `yarn`
```
$ yarn global add directory-stat
```

## USAGE
```
$ directory-stat --help
Get directory statistics where "fs" not available

USAGE
  $ directory-stat DIR

ARGUMENTS
  DIR  directory

OPTIONS
  -h, --help            show CLI help
  -r, --[no-]recursive  enable to get statistics recursively
  -v, --version         show CLI version

DESCRIPTION
  Save directory statistics as a JSON file named ".dirstat" in that directory
```

## CHANGELOG
See more [here](https://github.com/lqmanh/directory-stat/blob/master/CHANGELOG.md).
