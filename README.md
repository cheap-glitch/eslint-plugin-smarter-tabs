# 🎓 eslint-plugin-smarter-tabs

[![License](https://shields.io/github/license/cheap-glitch/eslint-plugin-smarter-tabs)](LICENSE)
[![Latest release](https://shields.io/github/v/release/cheap-glitch/eslint-plugin-smarter-tabs?sort=semver&label=latest%20release&color=green)](https://github.com/cheap-glitch/eslint-plugin-smarter-tabs/releases/latest)
[![Coverage status](https://shields.io/coveralls/github/cheap-glitch/eslint-plugin-smarter-tabs)](https://coveralls.io/github/cheap-glitch/eslint-plugin-smarter-tabs)

This plugin aims  to enforce the usage  of smart tabs, as defined
[in the emacs wiki](https://www.emacswiki.org/emacs/SmartTabs):

> 1. Tabs are only  used at the beginning  of lines. Everything else, like ASCII
>    art and tables, should  be formatted with spaces.
> 2. Tabs  are  only used  for  expressing  the  indentation level. One  tab per
>    “block” — any remaining whitespace is spaces only.

To accomplish this, the plugin exports a single rule which issues a report in three cases:

1. The line contains an inline tabulation:

<table>
	<tr>
		<th>✅ Valid</th>
		<th>❌ Invalid</th>
	</tr>
	<tr>
		<td>

```javascript
const foo    = true;
const foobar = false;
```
</td>
		<td>

```javascript
const foo———𝈷= true;
const foobar = false;
```
</td>
	</tr>
</table>

2. The line use spaces for indentation. This happens when a line is indented with
spaces or  starts with  tabs followed  by spaces, and  its indentation  level is
different than the one of its block:

<table>
	<tr>
		<th>✅ Valid</th>
		<th>❌ Invalid</th>
	</tr>
	<tr>
		<td>

```javascript
function foo(bar) {
————𝈷return (bar === undefined)
————𝈷       ? 'foo';
————𝈷       : 'bar';
}
```
</td>
		<td>

```javascript
function foo(bar) {
————𝈷return (bar === undefined)
————𝈷————𝈷  ? 'foo';
————𝈷————𝈷  : 'bar';
}
```
</td>
	</tr>
</table>

3.  The  line  has  a  mismatched  indentation  level.  This  happens  when  the
indentation level of the  line is greater than the one of the  line before it by
two or more:

<table>
	<tr>
		<th>✅ Valid</th>
		<th>❌ Invalid</th>
	</tr>
	<tr>
		<td>

```javascript
if (baz) {
————𝈷let p = { x: 1,
————𝈷          y: 2,
————𝈷          z: 3,
————𝈷};
}
```
</td>
		<td>

```javascript
if (baz) {
————𝈷let p = { x: 1,
————𝈷————𝈷————𝈷y: 2,
————𝈷————𝈷————𝈷z: 3,
————𝈷};
}
```
</td>
	</tr>
</table>

## Installation

```
npm i -D eslint-plugin-smarter-tabs
```

Make sure you've also [installed ESLint](https://eslint.org/docs/user-guide/getting-started#installation-and-usage).

## Usage

This plugin exports a single rule, called `smarter-tabs`:

```json
{
  "plugins": [
    "smarter-tabs"
  ],
  "rules": {
    "smarter-tabs/smarter-tabs": "warn"
  }
}
```

If you  use the `eslint:recommended`  preset, you may  also want to  disable the
`no-mixed-spaces-and-tabs` rule as it might clash with this plugin:

```json
{
  "rules": {
    "no-mixed-spaces-and-tabs": "off",
    "smarter-tabs/smarter-tabs": "warn"
  }
}
```

Or you could pass it the `smart-tabs` options:

```json
{
  "rules": {
    "no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
    "smarter-tabs/smarter-tabs": "warn"
  }
}
```

## Changelog

See the full changelog [here](https://github.com/cheap-glitch/eslint-plugin-smarter-tabs/releases).

## Contributing

Contributions are welcomed! Please open an issue before submitting substantial changes.

## Related

 * [`indent`](https://eslint.org/docs/rules/indent#indent), [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces#no-multi-spaces), [`no-mixed-spaces-and-tabs`](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs#no-mixed-spaces-and-tabs) – Useful core ESLint rules to manage white space in code
 * [`unicorn/template-indent`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md) – Rule from the [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) plugin to fix whitespace-insensitive template indentation

## License

ISC
