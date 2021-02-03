/**
 * eslint-plugin-smarter-tabs
 *
 * A tiny ESLint plugin to enforce the usage of smart tabs.
 *
 * Copyright (c) 2019-present, cheap glitch
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

import { Rule } from 'eslint';

function getIndentLevel(line: string): number {
	const match = line.match(/^(?<indent>\t*)/);

	return (match && match.groups) ? match.groups?.indent.length ?? 0 : 0;
}

function lintNode(context: Rule.RuleContext, node: Rule.Node): void {
	const lines = context.getSourceCode().getText(node).split(/\r?\n/);

	for (const [index, line] of lines.entries()) {
		const lineNumber = (node.loc?.start.line ?? 0) + index;

		// Ignore commented lines starting with tabs
		if (/^\t+\/\//.test(line)) {
			continue;
		}

		// Report if the line contains an inline tab
		const inlineTab = line.match(/(\S *)(\t+)/);
		if (inlineTab) {
			context.report({
				message: 'Inline tabulation',
				loc: {
					start: {
						line:   lineNumber,
						column: (inlineTab.index ?? 0) + inlineTab[1].length,
					},
					end: {
						line:   lineNumber,
						column: (inlineTab.index ?? 0) + inlineTab[1].length + inlineTab[2].length,
					},
				},
			});

			continue;
		}

		/**
		 * Report if the line uses space for indentation:
		 *  → the line has a different indentation level than the ones around it
		 *  OR
		 *  → the line has a different indentation level than the one before it
		 *    AND the line before it has a higher level than the one after it (fix the "end-of-block problem")
		 */
		const spacesUsedForIndentation = line.match(/^(\t*) /);
		const indentLevel              = getIndentLevel(line);
		const prevIndentLevel          = index > 0                  ? getIndentLevel(lines[index - 1]) : indentLevel;
		const nextIndentLevel          = index < (lines.length - 1) ? getIndentLevel(lines[index + 1]) : indentLevel;

		if (spacesUsedForIndentation && (![nextIndentLevel, prevIndentLevel].includes(indentLevel) || (indentLevel !== prevIndentLevel && prevIndentLevel > nextIndentLevel))) {
			context.report({
				message: 'Spaces used for indentation',
				loc: {
					start: {
						line:   lineNumber,
						column: indentLevel > prevIndentLevel ? (spacesUsedForIndentation[1].length - (indentLevel - prevIndentLevel)) : 0,
					},
					end: {
						line:   lineNumber,
						column: spacesUsedForIndentation[1].length,
					},
				},
			});

			continue;
		}

		/**
		 * Report if the indentation of the line is deeper than the one
		 * of the line before by two levels or more
		 */
		const isPrevLineEmpty = index > 0 ? (lines[index - 1].length === 0) : undefined;
		if (prevIndentLevel !== undefined && isPrevLineEmpty === false && (indentLevel - prevIndentLevel) >= 2) {
			context.report({
				message: 'Mismatched indentation',
				loc: {
					start: {
						line:   lineNumber,
						column: indentLevel - (indentLevel - prevIndentLevel - 1),
					},
					end: {
						line:   lineNumber,
						column: indentLevel - 1,
					},
				},
			});
		}
	}
}

export const rules: Record<string, Rule.RuleModule> = {
	'smarter-tabs': {
		meta: {
			type: 'layout',
			docs: {
				description: 'enforce the usage of smart tabs',
				category:    'stylistic issues',
				url:         'https://github.com/cheap-glitch/eslint-plugin-smarter-tabs#readme',
			},
		},
		create: context => ({
			// Apply the rule on top-level nodes only
			'[parent.type="Program"]': (node: Rule.Node) => lintNode(context, node),
		}),
	},
};
