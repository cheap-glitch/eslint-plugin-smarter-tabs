
/**
 * eslint-plugin-smarter-tabs
 *
 * A tiny ESLint plugin to enforce the usage of smart tabs.
 *
 * Copyright (c) 2019-present, cheap glitch
 *
 *
 * Permission  to use,  copy, modify,  and/or distribute  this software  for any
 * purpose  with or  without  fee is  hereby granted,  provided  that the  above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS  SOFTWARE INCLUDING ALL IMPLIED  WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE  AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL  DAMAGES OR ANY DAMAGES  WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER  TORTIOUS ACTION,  ARISING OUT  OF  OR IN  CONNECTION WITH  THE USE  OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

// Helper function to compute the indentation level of a line
const getIndentLevel = _line => _line.match(/^(\t*)/)[1].length;

module.exports.rules = {
'smarter-tabs': {
	meta: {
		type: 'layout',
		docs: {
			description:  'enforce the usage of smart tabs',
			category:     'stylistic issues',
			url:          'https://github.com/cheap-glitch/eslint-plugin-smarter-tabs#eslint-plugin-smarter-tabs',
		},
	},

	create: function(_context)
	{
		const sourceCode    = _context.getSourceCode();
		let prevIndentLevel = null;

		// Apply the rule on top-level nodes only
		return { '[parent.type="Program"]': function(_node)
		{
			const nodeSource = sourceCode.getText(_node);

			// Parse the text lines of the node
			nodeSource.split('\n').forEach(function(_line, _index)
			{
				const lineNb = _node.loc.start.line + _index;

				// Report if the line contains an inline tab
				const inlineTab = _line.match(/(\S *)(\t+)/);
				if (inlineTab)
				{
					_context.report({
						message: 'Inline tabulation',
						loc: {
							start: {
								line:   lineNb,
								column: inlineTab.index + inlineTab[1].length,
							},
							end: {
								line:   lineNb,
								column: inlineTab.index + inlineTab[1].length + inlineTab[2].length,
							},
						}
					});
				}

				// Report if a line starting with spaces (with potential tabs
				// before them) has a different indentation level than the one before it
				const indentLevel      = getIndentLevel(_line);
				const mismatchedIndent = _line.match(/^(\t*) /);
				if (mismatchedIndent && prevIndentLevel !== null && indentLevel != prevIndentLevel)
				{
					_context.report({
						message: 'Mismatched indentation',
						loc: {
							start: {
								line:   lineNb,
								column: indentLevel > prevIndentLevel
								      ? (mismatchedIndent[1].length - (indentLevel - prevIndentLevel))
								      : 0,
							},
							end: {
								line:   lineNb,
								column: mismatchedIndent[1].length,
							},
						}
					});
				}

				// Keep track of the indentation level of the previous line
				prevIndentLevel = indentLevel;
			});
		}
	}}
}}
