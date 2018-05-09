const main = require('..');

const { sanitize } = main;

test('<img>', () => {
  expect(sanitize('<img src="a" abc="1" width="23" height="30" />')).toBe('<img src="a" width="23" height="30" />');
});

test('No <iframe>', () => {
  expect(sanitize('<iframe src="https://coldfunction.com"></iframe>')).toBe('');
});
