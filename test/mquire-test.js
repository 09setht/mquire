var mquire = require('../index');
var chai = require('chai');

describe('mquire', function () {
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
});