'use strict';
const fs = require('fs');
const findChrome = require('../lib/index');

describe('chrome-finder', () => {

  it('#findChrome()', async () => {
    const chromePath = findChrome();
    fs.accessSync(chromePath, fs.constants.X_OK);
    console.log(chromePath);
  });

});
