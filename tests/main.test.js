const main = require('..');

const { sanitize } = main;

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
