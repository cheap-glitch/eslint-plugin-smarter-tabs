# eslint-plugin-smarter-tabs

**eslint-plugin-smarter-tabs**  aims to  enforce  the usage  of  smart tabs,  as
defined [in the emacs wiki](https://www.emacswiki.org/emacs/SmartTabs):

> 1. Tabs are only  used at the beginning  of lines. Everything else, like ASCII
>    art and tables, should  be formatted with spaces.
> 2. Tabs  are  only used  for  expressing  the  indentation level. One  tab per
>    “block” — any remaining whitespace is spaces only.

To accomplish this, the rule issues a report in three possible cases:
```javascript
/**
 * 1. The line contains an inline tabulation
 */

// Invalid
let foo———>= true;
let foobar = false;

// Valid
let foo    = true;
let foobar = false;

/**
 * 2. The line use spaces as indentation
 *
 * This happens when a line starts with tabs followed by some spaces,
 * but has a different indentation level than the one of its block
 */

// Invalid
function foo(bar)
{
————>return (bar === null)
————>————>  ? 'error';
————>————>  : 'no error';
}

// Valid
function foo(bar)
{
————>return (bar === null)
————>       ? 'error';
————>       : 'no error';
}

/**
 * 3. The line has mismatched indentation
 *
 * This happens when the indentation level of the line is greater
 * than the one of the line before it by two or more
 */

// Invalid
if (baz)
{
————>let p = { x: 1,
————>————>————>y: 2,
————>————>————>z: 3,
————>};
}

// Valid
if (baz)
{
————>let p = { x: 1,
————>          y: 2,
————>          z: 3,
————>};
}

```

## Insallation


```
npm i -D eslint-plugin-smarter-tabs
```

## Usage

The plugin exports a single rule called  `smarter-tabs` that you can use in your
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
`no-mixed-spaces-and-tabs` rule as it might clash with it:
```json
{
	"rules": {
		"no-mixed-spaces-and-tabs":  "off",
		"smarter-tabs/smarter-tabs": "warn"
	}
}
```
Or you could pass it the `smart-tabs` options:
```json
{
	"rules": {
		"no-mixed-spaces-and-tabs":  ["warn", "smart-tabs"],
		"smarter-tabs/smarter-tabs": "warn"
	}
}
```

## License

This software is distributed under the ISC license.
