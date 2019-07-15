import { $mapKey } from './doms';

const GMAP_KEY = $mapKey.attr('content') || '';

export const RESIZE_TIME = 180;

export const GMAP_URL = GMAP_KEY && `https://maps.googleapis.com/maps/api/js?v=3&key=${GMAP_KEY}`;

export const RESPONSIVE_BREAKPOINTS = {
  TABLET: 768,
  DESKTOP: 992
};

export const DEFAULT_AJAX_OPTS = {
  cache: false
};
