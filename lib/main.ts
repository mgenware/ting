import * as sanitizeHTML from 'sanitize-html';
import defaultSanitizeHTMLOptions from './defSanitizeHTMLOptions';

export interface IOptions {
  allowedID: (id: string) => boolean;
}

export { defaultSanitizeHTMLOptions };

export function sanitize(
  html: string,
  _: IOptions,
  overrideOpts: (opts: sanitizeHTML.IOptions) => sanitizeHTML.IOptions,
): string {
  let sanitizeHTMLOpts = defaultSanitizeHTMLOptions as sanitizeHTML.IOptions;
  if (overrideOpts) {
    sanitizeHTMLOpts = overrideOpts(sanitizeHTMLOpts);
  }

  return sanitizeHTML(html, sanitizeHTMLOpts);
}
