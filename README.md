# 🎓 eslint-plugin-smarter-tabs
![License](https://badgen.net/github/license/cheap-glitch/eslint-plugin-smarter-tabs?color=green)
![Latest release](https://badgen.net/github/release/cheap-glitch/eslint-plugin-smarter-tabs?color=green)
[![Coverage status](https://coveralls.io/repos/github/cheap-glitch/eslint-plugin-smarter-tabs/badge.svg?branch=main)](https://coveralls.io/github/cheap-glitch/eslint-plugin-smarter-tabs?branch=main)

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
		<th>Valid</th>
		<th>Invalid</th>
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
		<th>Valid</th>
		<th>Invalid</th>
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
		<th>Valid</th>
		<th>Invalid</th>
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

```shell
npm i -D eslint-plugin-smarter-tabs
```

## Usage

This plugin exports a single rule called `smarter-tabs` that you can use in your
`.eslintrc.json` or `eslintrc.js`:
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

Contributions are welcomed!

## License

This software is distributed under the [ISC license](https://www.isc.org/licenses).
