
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

module.exports = {
	meta: {
	},

	create: function(_context)
	{
		const sourceCode    = _context.getSourceCode();
		let prevIndentLevel = null;

		return {
			// Apply the rule on top-level nodes only
			'[parent.type="Program"]': function(_node)
			{
				const nodeSource = sourceCode.getText(_node);

				// Parse the text lines of the node
				nodeSource.split('\n').forEach(_line =>
				{
					// Report if the line contains an inline tab
					if (/\S *\t/.test(_line))
					{
						_context.report({
							node:     _node,
							message:  'Inline tablature',
						});
					}

					// Report if a line starting with tabs then spaces
					// has a different indentation level than the one before it
					if (/^\t* /.test(_line) && prevIndentLevel && getIndentLevel(_line) != prevIndentLevel)
					{
						_context.report({
							node:     _node,
							message:  'Mismatched indentation',
						});
					}

					// Keep track of the indentation level of the previous line
					prevIndentLevel = getIndentLevel(_line);
				});
			}
		}
	}
}
