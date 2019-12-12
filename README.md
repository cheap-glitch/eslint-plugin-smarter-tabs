# eslint-plugin-smarter-tabs

**eslint-plugin-smarter-tabs**  aims to  enforce  the usage  of  smart tabs,  as
defined [in the emacs wiki](https://www.emacswiki.org/emacs/SmartTabs):

> 1. Tabs are only  used at the beginning  of lines. Everything else, like ASCII
>    art and tables, should  be formatted with spaces.
> 2. Tabs  are  only used  for  expressing  the  indentation level. One  tab per
>    “block” — any remaining whitespace is spaces only.

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
