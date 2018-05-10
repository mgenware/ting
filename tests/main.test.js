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

test('Code', async () => {
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
