
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
const getIndentLevel = line => line.match(/^(\t*)/)[1].length;

module.exports.rules = {
'smarter-tabs': {
	meta: {
		type: 'layout',
		docs: {
			description:  'enforce the usage of smart tabs',
			category:     'stylistic issues',
			url:          'https://github.com/cheap-glitch/eslint-plugin-smarter-tabs#readme',
		},
	},

	create: function(context)
	{
		const sourceCode = context.getSourceCode();

		// Apply the rule on top-level nodes only
		return { '[parent.type="Program"]': function(node)
		{
			const nodeSource = sourceCode.getText(node);

			// Parse the text lines of the node
			nodeSource.replace(/\r\n/g, '\n').split('\n').forEach(function(line, index, lines)
			{
				const lineNb = node.loc.start.line + index;

				// Ignore commented lines starting with tabs
				if (/^\t+\/\//.test(line)) return;

				/**
				 * Report if the line contains an inline tab
				 */
				const inlineTab = line.match(/(\S *)(\t+)/);
				if (inlineTab)
				{
					context.report({
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

					return;
				}

				/**
				 * Report if the line use space for indentation:
				 *
				 *  → the line has a different indentation level than the ones around it
				 *  OR
				 *  → the line has a different indentation level than the one before it
				 *    AND the line before it has a higher level than the one after it (fix the "end-of-block problem")
				 */
				const spacesUsedForIndentation = line.match(/^(\t*) /);

				const indentLevel     = getIndentLevel(line);
				const prevIndentLevel = index > 0                  ? getIndentLevel(lines[index - 1]) : indentLevel;
				const nextIndentLevel = index < (lines.length - 1) ? getIndentLevel(lines[index + 1]) : indentLevel;

				if (spacesUsedForIndentation && (
					![nextIndentLevel, prevIndentLevel].includes(indentLevel)
					|| (indentLevel != prevIndentLevel && prevIndentLevel > nextIndentLevel)
				)) {
					context.report({
						message: 'Spaces used for indentation',
						loc: {
							start: {
								line:   lineNb,
								column: indentLevel > prevIndentLevel
								      ? (spacesUsedForIndentation[1].length - (indentLevel - prevIndentLevel))
								      : 0,
							},
							end: {
								line:   lineNb,
								column: spacesUsedForIndentation[1].length,
							},
						}
					});

					return;
				}

				/**
				 * Report if the indentation of the line is deeper than the one of the line before by two levels or more
				 */
				const isPrevLineEmpty = index > 0 ? (lines[index - 1].length == 0) : null;

				if (prevIndentLevel !== null && isPrevLineEmpty === false && (indentLevel - prevIndentLevel) >= 2)
				{
					context.report({
						message: 'Mismatched indentation',
						loc: {
							start: {
								line:   lineNb,
								column: indentLevel - (indentLevel - prevIndentLevel - 1),
							},
							end: {
								line:   lineNb,
								column: indentLevel - 1,
							},
						}
					});
				}
			});
		}
	}}
}}
