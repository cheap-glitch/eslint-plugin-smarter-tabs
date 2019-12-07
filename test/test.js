
/**
 * test/test.js
 */

const RuleTester = require('eslint').RuleTester;
const rules      = require('../index').rules;

/**
 * Test snippets for inline tablatures
 * -----------------------------------------------------------------------------
 */
const snippetsInlineTabs = [
[
`
let someVar      = 1;
let someOtherVar = 2;
`
,
`
let someVar	 = 1;
let someOtherVar = 2;
`
], [
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
], [
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
], [
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
function yesOrNo(param)
{
	return param === true
	    ? 'yes'
            : 'no';
}
`
], [
`
let bar;

const style = {
	'background-color': 'gold',
	    'border-color': 'black',
}

function foo()  {}
`
,
`
let bar;

const style = {
        'background-color': 'gold',
	    'border-color': 'black',
}

function foo()  {}
`
]
];

/**
 * Run tests
 * -----------------------------------------------------------------------------
 */
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
ruleTester.run('smarter-tabs', rules['smarter-tabs'],
	{
		valid:    [...snippetsInlineTabs, ...snippetsMismatchedTabs].map(_s => _s[0]),
		invalid:  [
			...snippetsInlineTabs.map(    _s => ({ code: _s[1], errors: [{ message: 'Inline tablature'       }] })),
			...snippetsMismatchedTabs.map(_s => ({ code: _s[1], errors: [{ message: 'Mismatched indentation' }] })),
		]
	}
);
