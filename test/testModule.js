var fs = require('fs');
var anotherTestLib = require('./anotherTestLib');

exports.name = 'testModule';
exports.anotherName = anotherTestLib.name;
exports.deepName = anotherTestLib.depName;
exports.deeperName = anotherTestLib.deepName;