export const $win = $(window);
export const $doc = $(document);
export const $html = $('html');
export const $head = $('head');
export const $body = $('body');
export const $htmlBody = $html.add($body);
export const $mapKey = $('meta[name="map-key"]');

/*
 * Add fixed element's selector here to
 * prevent their flick size when freezing body
 */
export const $fixed = $([

].join(', '));
