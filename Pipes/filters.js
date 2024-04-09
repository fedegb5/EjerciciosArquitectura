"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badWords = void 0;
var Filter = require('bad-words');
function badWords(data) {
    var customFilter = new Filter({ placeHolder: 'x' });
    return customFilter.clean(data);
}
exports.badWords = badWords;
