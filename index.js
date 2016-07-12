'use strict';

var OPTIONS = {
	minWordLength: 3,
	lowercase: true,
	stopwords: []
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
		if (typeof options.stopwords === 'string') {
			var lang = options.stopwords;
			if (lang.length !== 2) {
				throw new Error('Invalid options.stopwords');
			}
			lang = lang.toLowerCase();
			options.stopwords = require('stopwords-json/dist/' + lang);
		}
		options = defaults(options, OPTIONS);
		options.stopwords = options.stopwords || [];
	} else {
		options = OPTIONS;
	}

	return options;
}

function textmap(text, options) {
	// console.log(options);
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
			return word.length >= options.minWordLength && options.stopwords.indexOf(word) === -1;
		});

	var map = {};

	for (i = 0; i < ntext.length; i++) {
		var word = ntext[i];
		if (map[word]) {
			map[word] += 1;
		} else {
			// word score
			map[word] = 1;
		}
	}

	return map;
}

function search(textMap, queryMap) {
	var score = 0;
	var queryMapLength = 0;
	// var textMapLength = Object.keys(textMap).length / 2;
	// console.log('============');
	for (var key in queryMap) {
		queryMapLength++;

		if (textMap[key]) {
			// console.log(key, textMap[key]);
			// score += textMap[key];
			score++;
		}
	}

	if (queryMapLength > 0) {
		score = score / queryMapLength;
		// score = score * (queryMapLength / textMapLength);
	}

	// console.log(queryMap);

	return score;
}

module.exports = function(text, options) {
	options = getOptions(options);
	var map = textmap(text, options);

	return {
		search: function(str) {
			return search(map, textmap(str, options));
		}
	};
};
