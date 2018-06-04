'use strict';

import memoryStorage from './memory.js';
import fileStorage from './filesystem.js';

let dataStorageModule = {};

switch (process.env.STORAGE) {
  case 'filesystem':
    dataStorageModule = fileStorage;
    break;
  case 'memory':
    dataStorageModule = memoryStorage;
    break;
}

export default dataStorageModule;