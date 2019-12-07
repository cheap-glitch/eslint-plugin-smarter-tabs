# eslint-plugin-smarter-tabs

**eslint-plugin-smarter-tabs**  aims to  enforce  the usage  of  smart tabs,  as
defined [in the emacs wiki](https://www.emacswiki.org/emacs/SmartTabs):

> 1. Tabs are only  used at the beginning  of lines. Everything else, like ASCII
>    art and tables, should  be formatted with spaces.
> 2. Tabs  are  only used  for  expressing  the  indentation level. One  tab per
>    “block” — any remaining whitespace is spaces only.

# Insallation

```
npm install -D eslint-plugin-smarter-tabs
```

# Usage

The plugin exports a single rule called `smarter-tabs`:
```javascript
// In your '.eslintrc.json' or '.eslintrc.js':

```
