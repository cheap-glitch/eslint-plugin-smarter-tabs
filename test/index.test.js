
/**
 * tests/index.test.js
 */

const RuleTester = require('eslint').RuleTester;
const tester     = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

tester.run('smarter-tabs', require('../index.js').rules['smarter-tabs'], {

/**
 * Valid code spnippets
 * -----------------------------------------------------------------------------
 */
valid: [
	/* eslint-disable smarter-tabs/smarter-tabs */
	ft(`
		let foo    = 0;
		let foobar = false;
	`),
	ft(`
		const foo = {
			bar:    'a',
			foobar: 'b',
		};
	`),
	ft(`
		if (foo)      baz = 1;
		else if (bar) baz = 2;
	`),
	ft(`
		if (bar) {
			let foo = [0, 1,
			           2, 3];
		}
	`),
	ft(`
		function foo(param)
		{
			return param === true
			    ? 'yes'
			    : 'no';
		}
	`),
	ft(`
		const style = {
			'background-color': 'gold',
			    'border-color': 'black',
		}
	`),
	ft(`
		const foobar = {
			bar: true,
		}
	`),
	ft(`
		function foo() {
			return {
				        foo: 2,
				foobarfooba: 3,
			}
		}
	`),

	// Comments should be ignored
	ft(`
		// let foo    = 1;
		// let foobar = 2;
	`),
	ft(`
		// const foo = {
		// 	bar: true,
		// }
	`),
	ft(`
		const foo = {
			// data() {
			// 	return {
			// 		bar: true,
			// 	}
			// }
		}
	`),

	// It should work with Windows line endings too (see https://github.com/cheap-glitch/eslint-plugin-smarter-tabs/issues/3)
	ft(`
		class X {\r
			constructor() {\r
				this.a = 1\r
				this.b = 1\r
				<EMPTY>
				this.c = 1\r
			}\r
		}\r
	`),
	/* eslint-enable smarter-tabs/smarter-tabs */
],

/**
 * Invalid code spnippets
 * -----------------------------------------------------------------------------
 */
invalid: [
	{
		/* eslint-disable smarter-tabs/smarter-tabs */
		code: ft(`
			let foo	   = 0;
			let foobar = false;
		`),
		/* eslint-enable smarter-tabs/smarter-tabs */
		errors: [{
			message:   'Inline tabulation',
			line:      1,
			column:    8,
			endLine:   1,
			endColumn: 9,
		}]
	},
	{
		/* eslint-disable smarter-tabs/smarter-tabs */
		code: ft(`
			const foo = {
				bar:	'a',
				foobar: 'b',
			};
		`),
		/* eslint-enable smarter-tabs/smarter-tabs */
		errors: [{
			message:   'Inline tabulation',
			line:      2,
			column:    6,
			endLine:   2,
			endColumn: 7,
		}]
	},
	{
		/* eslint-disable smarter-tabs/smarter-tabs */
		code: ft(`
			if (foo)	baz = 1;
			else if (bar)	baz = 2;
		`),
		/* eslint-enable smarter-tabs/smarter-tabs */
		errors: [{
			message:   'Inline tabulation',
			line:      1,
			column:    9,
			endLine:   1,
			endColumn: 10,
		}, {
			message:   'Inline tabulation',
			line:      2,
			column:    14,
			endLine:   2,
			endColumn: 15,
		}]
	},
	{
		/* eslint-disable smarter-tabs/smarter-tabs */
		code: ft(`
			if (bar) {
				let foo = [0, 1,
					   2, 3];
			}
		`),
		/* eslint-enable smarter-tabs/smarter-tabs */
		errors: [{
			message:   'Spaces used for indentation',
			line:      3,
			column:    2,
			endLine:   3,
			endColumn: 3,
		}]
	},
	{
		/* eslint-disable smarter-tabs/smarter-tabs */
		code: ft(`
			if (bar) {
				let foo = true;
			        let bar = false;
			}
		`),
		/* eslint-enable smarter-tabs/smarter-tabs */
		errors: [{
			message:   'Spaces used for indentation',
			line:      3,
			column:    1,
			endLine:   3,
			endColumn: 1,
		}]
	},
	{
		/* eslint-disable smarter-tabs/smarter-tabs */
		code: ft(`
			const foobar = {
					bar: true,
			}
		`),
		/* eslint-enable smarter-tabs/smarter-tabs */
		errors: [{
			message:   'Mismatched indentation',
			line:      2,
			column:    2,
			endLine:   2,
			endColumn: 2,
		}]
	},
	{
		/* eslint-disable smarter-tabs/smarter-tabs */
		code: ft(`
			function foo() {
				return {
						foo: 2,
					foobarfooba: 3,
				}
			}
		`),
		/* eslint-enable smarter-tabs/smarter-tabs */
		errors: [{
			message:   'Mismatched indentation',
			line:      3,
			column:    3,
			endLine:   3,
			endColumn: 3,
		}]
	},
]

});

/**
 * Remove the indentation from a code snippet
 */
function ft(snippet)
{
	const emptyLineRegex = /^\s*$/;
	const indentRegex    = /^\t+/;

	// Remove empty lines
	const lines = snippet.split('\n').filter(line => !emptyLineRegex.test(line));

	// Find the indentation level of the block
	const indent = Math.min(...lines.map(line => line.match(indentRegex)[0].length));

	return lines.map(line => line
		// Remove the block indentation
		.slice(indent)
		// Replace <EMPTY> placeholders by real empty lines
		.replace(/^\t*<EMPTY>$/g, '')
	).join('\n');
}
