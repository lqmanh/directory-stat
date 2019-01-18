# CHANGELOG

## Stable Branch
### v0.5.1
- FIXED: Fix error not publish `/*.js` files to npm

### v0.5.0
- NEW: Add `-m, --minified` option
- NEW: More semantic importing: `require('directory-stat/stat-collectors')` instead of `require('directory-stat').StatCollectors`
- CHANGED: Dependency `@oclif/plugin-warn-if-update-available` is now optional

### v0.4.0
- NEW: Extend support for Node.js >= 8.0.0
- CHANGED: Integrate PathCollector into StatWriter and cannot be removed

### v0.3.0
- NEW: Add `-o, --output` option
- NEW: Add `-d, --depth` option
- CHANGED: Deprecate `-r, --recursive` option
- CHANGED: StatWriter now has the same default values as in CLI
- UPDATED: Improve example file `tests/main.js`

### v0.2.1
- FIXED: Attempt to fix stat collectors importing error
- UPDATED: Update `tests/main.js` example file

### v0.2.0
- NEW: Add `-x, --exclude` option
- NEW: Size, timestamp and type fields are now optional with `--[no-]size`, `--[no-]timestamp`, `--[no-]type` options
- NEW: The package can be used as a library now
- NEW: Support composable statistics collectors
- CHANGED: Apply recursive option with the passed directory, not its children
- CHANGED: Drop CLI support for Windows
- UPDATED: Improve description and docs

## 0.1.x - Early-access Branch
### v0.1.3
- NEW: Readd `type` field that store type of objects (block device, character device, directory, fifo pipe, file, socket, symbolic link)
- NEW: Store size (in bytes) in `size` field
- NEW: Show a warning message when the app is outdated
- UPDATED: Improve docs and mark v0.1.x are early-access releases

### v0.1.2
- NEW: Add `-r, --[no-]recursive` option
- NEW: Add changelog
- UPDATED: Improve description and docs

### v0.1.1
- NEW: Store the statistics of the directory itself too
- NEW: Store path information in `path` field
- NEW: Store atime, ctime, mtime and birthtime in `timestamp` field
- CHANGED: Remove `name` field
- CHANGED: Remove `type` field *accidentally*
- CHANGED: Get statistics recursively by default

### v0.1.0
- NEW: Store names of children in `children` field
- NEW: Store type (directory, file, symbolic link) in `type` field
