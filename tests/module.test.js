const main = require('..');
const fs = require('fs');

test('Verify module members', () => {
  expect(typeof main.sanitize).toBe('function');
  expect(typeof main.defaultSanitizeHTMLOptions).toBe('object');
});

test('Check type definition file', () => {
  expect(fs.statSync('./dist/main.d.ts').isFile()).toBe(true);
});
