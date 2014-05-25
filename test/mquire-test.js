var mquire = require('../index');
var chai = require('chai');

describe('mquire', function () {
	var anotherTestLib;
	var deepDependency;
	var testModule;

	before(function(){
		deepDependency = require('./deepDependency');
		anotherTestLib = require('./anotherTestLib');
		testModule = require('./testModule');
	});

	it('returns a new instance of a module each time', function () {
		var modulev1 = mquire('./testModule');
		var modulev2 = mquire('./testModule');
		chai.assert.notEqual(modulev2, modulev1)
	});
	it('returns a consistent module', function () {
		var modulev1 = mquire('./testModule');
		var modulev2 = mquire('./testModule');
		chai.assert.deepEqual(modulev2, modulev1);
	});
	it('substitutes a mock for a simple dependency', function () {
		var mockAnotherTestLib = {name: 'myTestLib'};
		var module = mquire('./testModule', {
			'./anotherTestLib': mockAnotherTestLib
		});
		chai.assert.equal(module.anotherName, mockAnotherTestLib.name);
	});
	it('restores original module exports after mquiring module',function(){
		var mockAnotherTestLib = {name: 'myTestLib'};
		var module;
		mquire('./testModule', {
			'./anotherTestLib': mockAnotherTestLib
		});
		module = mquire('./testModule');
		chai.assert.equal(module.anotherName,testModule.anotherName);
	});
	it('subtitutes a mock for a dependency of a dependency',function(){
		var mockDeepDependency = {name: 'myDeepDependency'};
		var module = mquire('./testModule',{
			'./deepDependency':mockDeepDependency
		});
		chai.assert.equal(module.deepName,mockDeepDependency.name);
	});
	it('subtitutes a mock for a dependency of a dependency of a dependency',function(){
		var mockDeeperDependency = {name: 'myDeeperDependency'};
		var module = mquire('./testModule',{
			'./deeperDependency':mockDeeperDependency
		});
		chai.assert.equal(module.deeperName,mockDeeperDependency.name);
	});
});