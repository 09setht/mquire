var Module = require('module');

module.exports = function (parentModulePath, targetPath, mocks) {
	var filename = Module._resolveFilename(targetPath, parentModulePath);
	var result = new Module(filename, parentModulePath);

	var store = setMocks(mocks || {}, parentModulePath);
	result.load(filename);
	restoreDependencies(store);

	return result.exports;
};

function setMocks(mocks, parentModulePath) {
	var store = {};
	var path;
	var dependency;
	var mockName;

	for (mockName in mocks) {
		path = Module._resolveFilename(mockName, parentModulePath);
		dependency = require.cache[path];
		store[path] = dependency.exports;
		dependency.exports = mocks[mockName];
	}

	return store;
}
function restoreDependencies(store) {
	var depName;

	for (depName in store) {
		require.cache[depName].exports = store;
	}
}