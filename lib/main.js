const sanitizeHTML = require('sanitize-html');
const defaultSanitizeHTMLOptions = require('./defSanitizeHTMLOptions');

module.exports = {
  sanitize: function (html, options, overrideOpts) {
    options = options || defaultSanitizeHTMLOptions;
    if (overrideOpts) {
      options = overrideOpts(options);
    }
    return sanitizeHTML(html, options);
  },

  defaultSanitizeHTMLOptions: defaultSanitizeHTMLOptions,
};
