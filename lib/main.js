var sanitizeHTML = require('sanitize-html');

var defaultOptions = {
  allowedTags: [ 
    // common blocks
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
    'blockquote', 'p', 'ul', 'ol', 'div', 'pre', 'figure', 'figcaption',

    // table
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',
    
    // common inlines
    'a', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'img',
  ],

  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    img: [ 'src', 'width', 'height' ],
  },

  // *** The following is copied from sanitize-html's default options ***
  // Lots of these won't come up by default because we don't allow them
  selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
  // URL schemes we permit
  allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
  allowProtocolRelative: true,
};

module.exports = {
  sanitize: function (html, options, overrideOpts) {
    options = options || defaultOptions;
    if (overrideOpts) {
      options = overrideOpts(options);
    }
    return sanitizeHTML(html, options);
  },

  defaultOptions: defaultOptions,
};
