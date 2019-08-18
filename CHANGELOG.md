# CHANGELOG

## Stable Branch

### v1.0.3

#### PATCHES

- Fix fast-glob v3 breaking changes

### v1.0.2

#### PATCHES

- Upgrade dependencies to fix potential security vulnerabilities

### v1.0.1

#### PATCHES

- Fix `files` field in package.json

### v1.0.0

#### FEATURES

- Remove `-r, --recursive` option
- Remove `DirectoryStat`, `StatCollectors` from main entry point
- Remove Parcel (building process)

### v0.6.0

#### FEATURES

- Documentation now lives under https://lqmanh.github.io/directory-stat
- Many internal changes: add building process, migrate from npm to yarn, add ESLint and Prettier

### v0.5.1

#### PATCHES

- Fix error not publish `/*.js` files to npm

### v0.5.0

#### FEATURES

- Add `-m, --minified` option
- More semantic importing: `require('directory-stat/stat-collectors')` instead of `require('directory-stat').StatCollectors`
- Dependency `@oclif/plugin-warn-if-update-available` is now optional

### v0.4.0

#### FEATURES

- Extend support for Node.js >= 8.0.0
- Integrate `PathCollector` into `StatWriter` and cannot be removed

### v0.3.0

#### FEATURES

- Add `-o, --output` option
- Add `-d, --depth` option
- Deprecate `-r, --recursive` option
- `StatWriter` now has the same default values as in CLI

### v0.2.1

#### PATCHES

- Attempt to fix stat collectors importing error

### v0.2.0

#### FEATURES

- Add `-x, --exclude` option
- Size, timestamp and type fields are now optional with `--[no-]size`, `--[no-]timestamp`, `--[no-]type` options
- The package can be used as a library now
- Support composable statistics collectors
- Apply recursive option with the passed directory, not its children
- Drop CLI support for Windows

## Early-access Branch

### v0.1.3

#### FEATURES

- Readd `type` field that store type of objects (block device, character device, directory, fifo pipe, file, socket, symbolic link)
- Store size (in bytes) in `size` field
- Show a warning message when the app is outdated
- Mark v0.1.x are early-access releases

### v0.1.2

#### FEATURES

- Add `-r, --[no-]recursive` option
- Add changelog

### v0.1.1

#### FEATURES

- Store the statistics of the directory itself too
- Store path information in `path` field
- Store atime, ctime, mtime and birthtime in `timestamp` field
- Remove `name` field
- Remove `type` field _accidentally_
- Get statistics recursively by default

### v0.1.0

#### FEATURES

- Store names of children in `children` field
- Store type (directory, file, symbolic link) in `type` field
