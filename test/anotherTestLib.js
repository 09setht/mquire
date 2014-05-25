var dependency = require('./deepDependency');
exports.name = 'anotherTestLib';
exports.depName = dependency.name;
exports.deepName = dependency.depName;