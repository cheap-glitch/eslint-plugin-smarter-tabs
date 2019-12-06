
/**
 * test/test.js
 */

const RuleTester = require('eslint').RuleTester;
const rule       = require('../index');

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
const object = {
	prop:      value,
	otherProp: otherValue,
}
`
,
`
const object = {
	prop:	   value,
	otherProp: otherValue,
}
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
]
];

/**
 * Tests
 * -----------------------------------------------------------------------------
 */
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
ruleTester.run('smarter-tabs', rule,
	{
		valid:    [...snippetsInlineTabs, ...snippetsMismatchedTabs].map(_s => _s[0]),
		invalid:  [
			...snippetsInlineTabs.map(    _s => ({ code: _s[1], errors: [{ message: 'Inline tablature'       }] })),
			...snippetsMismatchedTabs.map(_s => ({ code: _s[1], errors: [{ message: 'Mismatched indentation' }] })),
		]
	}
);
