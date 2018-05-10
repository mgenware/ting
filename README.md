# ting

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://img.shields.io/travis/mgenware/ting.svg?style=flat-square&label=Build+Status)](https://travis-ci.org/mgenware/ting)
[![npm version](https://img.shields.io/npm/v/ting.svg?style=flat-square)](https://npmjs.com/package/ting)
[![Node.js Version](http://img.shields.io/node/v/ting.svg?style=flat-square)](https://nodejs.org/en/)

Opinionated HTML Sanitizer for Node.js. Built upon [sanitize-html](https://www.npmjs.com/package/sanitize-html).

* Keep up with the latest standards (new tags are allowed, e.g. `<aside>`, `<progress>`, `<time>`...).
* `<iframe>` is not allowed.
* `id` attribute is not allowed unless `idFilter` returns true (see [Options](#options)).
* Use of internal [sanitize-html](https://www.npmjs.com/package/sanitize-html) options is supported.
* TypeScript friendly.

## Installation
```sh
yarn add ting
```

## Usage
```js
const ting = require('ting');

ting.sanitize(
  html,             // the HTML string which need to be sanitized
  options,          // [Optional] ting options
  overrideOptions,  // [Optional] a function to override the internal sanitize-html options
);
```

Example:
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

### Options
```typescript
{
  // `id` attribute is not allowed unless `idFilter` returns true
  idFilter: (id: string) => boolean;
}
```

* Example: allow all `id`s starting with `"user-content-"`:
```js
ting.sanitize(`
<a id="id-attack">bad</a>
<a id="user-content-link">fine</a>
<a>no id</a>`, {
    idFilter: (id) => {
      return id.startsWith('user-content-');
    },
  });
/** Prints
  <a id="user-content-link">fine</a>
  <a>no id</a>
 */
```

### Overriding sanitize-html Options
ting is built upon [sanitize-html](https://www.npmjs.com/package/sanitize-html), you can override the internal sanitize-html options, or pass a new one (which would make ting no different than sanitize-html). e.g. to allow `<iframe>` tags, override the `allowedTags` and `allowedAttributes` of sanitize-html options.

```js
ting.sanitize('<iframe src="https://coldfunction.com"></iframe>', 
  undefined,    // no options for ting
  (opts) => {   // override sanitize-html options
    opts.allowedTags.push('iframe');
    opts.allowedAttributes.iframe = ['src'];
    return opts;
  });
// Prints: <iframe src="https://coldfunction.com"></iframe>
```
