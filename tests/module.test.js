const main = require('..');

describe('require this module', () => {
  test('Verify module members', () => {
    expect(typeof main.sanitize).toBe('function');
    expect(typeof main.defaultOptions).toBe('object');
  });
});
