import * as sanitizeHTML from 'sanitize-html';
import defaultSanitizeHTMLOptions from './defSanitizeHTMLOptions';

export interface IOptions {
  idFilter: (id: string) => boolean;
}

export { defaultSanitizeHTMLOptions };

export function sanitize(
  html: string,
  opts: IOptions,
  overrideOpts: (opts: sanitizeHTML.IOptions) => sanitizeHTML.IOptions,
): string {
  let sanitizeHTMLOpts = defaultSanitizeHTMLOptions as sanitizeHTML.IOptions;

  // Apply ting options
  opts = opts || {};
  sanitizeHTMLOpts.exclusiveFilter = (frame: sanitizeHTML.IFrame): boolean => {
    if (frame.attribs.id) {
      // id attribute is not allowed unless opts.idFilter returns true
      return opts.idFilter ? !opts.idFilter(frame.attribs.id as string) : true;
    }
    return false;
  };

  if (overrideOpts) {
    sanitizeHTMLOpts = overrideOpts(sanitizeHTMLOpts);
  }

  return sanitizeHTML(html, sanitizeHTMLOpts);
}
