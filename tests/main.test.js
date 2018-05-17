const main = require('..');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { sanitize } = main;

async function readTestFileAsync(name) {
  return await readFileAsync(`./tests/data/${name}.html`, 'utf8');
}

test('<img>', () => {
  expect(sanitize('<img src="a" abc="1" width="23" height="30" />')).toBe('<img src="a" width="23" height="30" />');
});

test('No <iframe>', () => {
  expect(sanitize('<iframe src="https://coldfunction.com"></iframe>')).toBe('');
});

test('Override options', () => {
  expect(sanitize('<iframe src="https://coldfunction.com"></iframe>', undefined, (opts) => {
    opts.allowedTags.push('iframe');
    opts.allowedAttributes.iframe = ['src'];
    return opts;
  })).toBe('<iframe src="https://coldfunction.com"></iframe>');
});

test('Code element', async () => {
  const html = await readTestFileAsync('code');
  expect(sanitize(html)).toBe(html);
});

test('ID is not allowed by default', async () => {
  expect(sanitize('<a id="bad">2</a><a id="m-a">2</a><a>3</a><stupid id="m-b">4</stupid>')).toBe('<a>3</a>4');
});

test('ID Filter', async () => {
  expect(sanitize('<a id="bad">2</a><a id="m-a">2</a><a>3</a><stupid id="m-b">4</stupid>', {
    idFilter: (id) => {
      return id.startsWith('m-');
    },
  })).toBe('<a id="m-a">2</a><a>3</a>4');
});

test('Inline SVG', async () => {
  const svg = `<svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
  <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
  <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
</svg>`;
  expect(sanitize(svg).trim()).toBe('');
});

test('SVG as an image', async () => {
  const svg = '<img src="./test.svg" />';
  expect(sanitize(svg)).toBe('<img src="./test.svg" />');
});
