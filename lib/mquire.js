var Module = require('module');

module.exports = function(parent,targetPath,mocks){
	var filename = Module._resolveFilename(targetPath, parent);
	mocks = getMockIds(mocks,parent);

	return getNewModule(parent,filename,mocks);
}

function getNewModule(parent, targetPath, mocks) {
	var result = new Module(targetPath, parent);

	result.require = myRequire;
	result._mocks = mocks;
	result.load(targetPath);

	return result.exports;
};

function myRequire(path){
	var result;
	var newModule;
	path = Module._resolveFilename(path,this);
	if (!(result = this._mocks[path])){
		if (path.indexOf('/') === -1){
			result = require(path);
		}
		else {
			result = getNewModule(this,path,this._mocks);
		}
	}

	return result;
}

function getMockIds(mocks, parent){
	var mockName;
	var mockId;
	var result = {};
	for (mockName in mocks){
		mockId = Module._resolveFilename(mockName,parent);
		result[mockId] = mocks[mockName];
	}

	return result;
}