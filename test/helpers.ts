// Remove the indentation from a code snippet
export function ft(snippet: string): string {
	const lines = snippet.split('\n').filter(line => !/^\s*$/.test(line));

	const minIndentationLevel = Math.min(...lines.map(line => {
		const match = line.match(/^\t+/);

		/* istanbul ignore next */
		return match ? match[0].length : 0;
	}));

	return lines.map(line => line
		// Remove the block indentation
		.slice(minIndentationLevel)
		// Replace <EMPTY> placeholders by real empty lines
		.replace(/^\t*<EMPTY>$/g, '')
	).join('\n');
}
