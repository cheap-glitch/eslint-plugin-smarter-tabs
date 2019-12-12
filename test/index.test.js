
/**
 * test/index.test.js
 */

const RuleTester = require('eslint').RuleTester;
const rules      = require('../index').rules;

/**
 * Test snippets for inline tabulations
 * -----------------------------------------------------------------------------
 */
const snippetsInlineTabs = [
[
// Valid snippet
`
let someVar      = 1;
let someOtherVar = 2;
`
,
// Invalid snippet
`
let someVar	 = 1;
let someOtherVar = 2;
`
,
// Error location
{ start: [1, 12], end: [1, 13] }
],
[
`
const bar = {
	prop:      value,
	otherProp: otherValue,
}
`
,
`
const bar = {
	prop:	   value,
	otherProp: otherValue,
}
`
,
{ start: [2, 7], end: [2, 8] }
],
[
`
let bar;

function baz() {}

if (foo)        bar = 1;
else if (foo2)  bar = 2;
`
,
`
let bar;

function baz() {}

if (foo)	bar = 1;
else if (foo2)  bar = 2;
`
,
{ start: [5, 9], end: [5, 10] }
]
];

/**
 * Test snippets for mismatched indentation
 * -----------------------------------------------------------------------------
 */
const snippetsMismatchedTabs = [
[
`
if (bar) {
	let foo = [0, 1,
	           2, 3];
}
`
,
`
if (bar) {
	let foo = [0, 1,
		   2, 3];
}
`
,
{ start: [3, 2], end: [3, 3] }
],
[
`
function foo(param)
{
	return param === true
	    ? 'yes'
	    : 'no';
}
`
,
`
function foo(param)
{
	return param === true
	    ? 'yes'
            : 'no';
}
`
,
{ start: [5, 1], end: [5, 1] }
],
[
`
let bar;

const style = {
	'background-color': 'gold',
	    'border-color': 'black',
}

function foo() {}
`
,
`
let bar;

const style = {
        'background-color': 'gold',
	    'border-color': 'black',
}

function foo() {}
`
,
{ start: [5, 1], end: [5, 2] }
]
];

/**
 * Run tests
 * -----------------------------------------------------------------------------
 */
const ruleTester           = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
const invalidSnippetHelper = _message => __s => ({
	code:   __s[1],
	errors: [{
		message:    _message,
		line:       __s[2].start[0] + 1,
		column:     __s[2].start[1],
		endLine:    __s[2].end[0] + 1,
		endColumn:  __s[2].end[1],
	}]
});

ruleTester.run('smarter-tabs', rules['smarter-tabs'],
	{
		valid:    [...snippetsInlineTabs, ...snippetsMismatchedTabs].map(_s => _s[0]),
		invalid:  [
			...snippetsInlineTabs.map(invalidSnippetHelper('Inline tabulation')),
			...snippetsMismatchedTabs.map(invalidSnippetHelper('Spaces used for indentation')),
		]
	}
);
