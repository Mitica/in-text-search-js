'use strict';

var assert = require('assert');
var textScore = require('../index.js');

describe('text-score', function() {
	it('should be equals', function() {
		var text = 'Some simple text';
		assert.equal(true, textScore(text).score(text) === 1);
		assert.equal(true, textScore(text).score('some text') === 1);
		assert.equal(true, textScore(text).score('text') === 1);
		assert.equal(true, textScore(text).score('text 12') === 1);
		assert.equal(true, textScore(text).score('too sm') === 0);
	});

	it('should be less then 1', function() {
		var text = 'Some simple text';
		var score = textScore(text).score('Some else text');
		assert.equal(true, score === 2 / 3);
		score = textScore(text).score('Some 1234 text');
		assert.equal(true, score === 2 / 3);
	});
});
