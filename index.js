'use strict';

var OPTIONS = {
	minWordLength: 4,
	lowercase: true
};

function isLetter(w) {
	return w.toUpperCase() !== w.toLowerCase();
}

function isDigit(w) {
	return /[0-9]/.test(w);
}

function defaults(target, source) {
	for (var prop in source) {
		if (typeof target[prop] === 'undefined') {
			target[prop] = source[prop];
		}
	}

	return target;
}

function getOptions(options) {
	if (options) {
		options = defaults({}, options);
		options = defaults(options, OPTIONS);
	} else {
		options = OPTIONS;
	}

	return options;
}

function texthash(text, options) {
	var ntext = '';
	var i = 0;
	for (i = 0; i < text.length; i++) {
		var w = text[i];
		ntext += (isLetter(w) || isDigit(w)) ? w : ' ';
	}
	ntext = ntext.replace(/ {2,}/g, ' ').trim();
	if (options.lowercase) {
		ntext = ntext.toLowerCase();
	}

	ntext = ntext.split(/ /g)
		.filter(function(word) {
			return word.length >= options.minWordLength;
		});

	var hash = {};

	for (i = ntext.length - 1; i >= 0; i--) {
		var word = ntext[i];
		if (hash[word]) {
			hash[word]++;
		} else {
			hash[word] = 1;
		}
	}

	return hash;
}

function score(h1, h2) {
	var result = 0;
	var h2length = 0;
	for (var key in h2) {
		h2length++;

		if (h1[key]) {
			result++;
		}
	}

	if (h2length > 0) {
		result = result / h2length;
	}

	return result;
}

module.exports = function(text, options) {
	options = getOptions(options);
	var h1 = texthash(text, options);

	return {
		score: function(str) {
			var h2 = texthash(str, options);
			return score(h1, h2);
		}
	};
};
