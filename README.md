[![Npm Package](https://img.shields.io/npm/v/chrome-finder.svg?style=flat-square)](https://www.npmjs.com/package/chrome-finder)
[![Build Status](https://img.shields.io/travis/gwuhaolin/chrome-finder.svg?style=flat-square)](https://travis-ci.org/gwuhaolin/chrome-finder)
[![Build Status](https://img.shields.io/appveyor/ci/gwuhaolin/chrome-finder.svg?style=flat-square)](https://ci.appveyor.com/project/gwuhaolin/chrome-finder)
[![Dependency Status](https://david-dm.org/gwuhaolin/chrome-finder.svg?style=flat-square)](https://npmjs.org/package/chrome-finder)
[![Npm Downloads](http://img.shields.io/npm/dm/chrome-finder.svg?style=flat-square)](https://www.npmjs.com/package/chrome-finder)

# chrome-finder
find a executable chrome in your system automatic

## Use
```js
const findChrome = require('chrome-finder');
const chromePath = findChrome();
```

 - if the `chrome` executable *is not* found, an error `Error('no chrome installations found')` will be thrown
 - if the `chrome` executable *is*     found, but the platform *is not* one of `['win32', 'darwin', 'linux']`, an error `Error('platform not support')` will be thrown.

## Use Case
chrome-finder has been used in:
- [chrome-runner](https://github.com/gwuhaolin/chrome-runner) run chrome with ease from node.
