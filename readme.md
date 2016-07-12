# in-text-search

Simple search function.

## Usage

```
var textSearch = require('in-text-search');

var target = textSearch('Some big sample text');
var score = target.search('sample');
// score === 1

score = target.search('small sample');
// score === 0.5
```
