# ting

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://img.shields.io/travis/mgenware/ting.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/ting)
[![npm version](https://img.shields.io/npm/v/ting.svg?style=flat-square)](https://npmjs.com/package/ting)
[![Node.js Version](http://img.shields.io/node/v/ting.svg?style=flat-square)](https://nodejs.org/en/)

Opinionated HTML Sanitizer for Node.js. Built upon [sanitize-html](https://www.npmjs.com/package/sanitize-html).

## Installation
```sh
yarn add ting
```

## Usage
```js
const ting = require('ting');

const dirty = `
<script>alert(1)</script>
<img src="x.jpg" onclick="alert(1)"/>
<img src="cool.jpg"/>
<figcaption>caption</figcaption>
`;

const safe = ting.sanitize(dirty);
console.log(safe);
/** Prints
  <img src="x.jpg" />
  <img src="cool.jpg" />
  <figcaption>caption</figcaption>
 */
```
