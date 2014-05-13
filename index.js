var internalMquire = require('./lib/mquire');

module.exports = function (depName, mocks) {

	return internalMquire(module.parent, depName, mocks);
};