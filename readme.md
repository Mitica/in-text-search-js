# in-text-search

Simple search function.

## Usage

```
var textSearch = require('in-text-search');

var text = 'Some big sample text';
var target = textSearch(text);
var score = target.search('sample');
// score === 1

score = target.search('small sample');
// score === 0.5

target = textSearch(text, {minTextLength: 3, lowercase: true, stopwords: ['small']});
score = target.search('small sample');
// score === 1
```
