## @naturalcycles/json2html

> Render arbitrary json as human-friendly html. CLI and API. Inspired by
> [json.human.js](https://github.com/marianoguerra/json.human.js)

[![npm](https://img.shields.io/npm/v/@naturalcycles/json2html/latest.svg)](https://www.npmjs.com/package/@naturalcycles/json2html)
[![](https://circleci.com/gh/NaturalCycles/json2html.svg?style=shield&circle-token=123)](https://circleci.com/gh/NaturalCycles/json2html)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Why

Sometimes you need to render some report to non-technical people, but too lazy to create a custom
html/css template for it. Just throw your json into this library and enjoy the good-enough result.

# Install

    yarn add @naturalcycles/json2html

# Examples

[Sample output](./src/test/mock1.json.html)

```sh

# Render `my.json` to `my.json.html`
json2html my.json

# Render all json files in `someDir`
json2html 'someDir/**/*.json'

```

# Packaging

- `engines.node >= 10.13`: Latest Node.js LTS
- `main: dist/index.js`: commonjs, es2018
- `types: dist/index.d.ts`: typescript types
- `/src` folder with source `*.ts` files included
