import layout from './layout';
import {
  $mapKey
} from './doms';

const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

const DEFAULT_GMAP_KEY = 'AIzaSyBxGSPCzu90IHbYPfE6j8bleprnrOk2ZII';

export const GMAP_KEY = $mapKey.attr('content') || DEFAULT_GMAP_KEY;
export const GMapApiUrl = `https://maps.googleapis.com/maps/api/js?v=3&key=${GMAP_KEY}`;
export const regExEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const regExYT = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^/&]{10,12})/;

export const resizeDuration = 180;
export const keyupDuration = 200;

export const generateGUID = (prefix = 'class') => {
  return `${prefix}-${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

export const getType = (data) => {
  let dataType = typeof data;

  if (dataType === 'object' && Array.isArray(data)) {
    dataType = 'array';
  }

  return dataType;
};

export const isInViewport = ($el) => {
  let offset = 200;
  let elemTop = $el.offset().top;
  let elemBottom = elemTop + $el.outerHeight();
  let viewportTop = layout.scroll;
  let viewportBottom = viewportTop + layout.height;

  return elemBottom + offset > viewportTop && elemTop - offset < viewportBottom;
};


export const serializeData = ($form) => {
  let dataInput = $form
    .find(':input:not([type="checkbox"])')
    .serializeArray();
  let dataCheckbox = $form
    .find(':input[type="checkbox"][name]')
    .get()
    .map(e => ({
      name: e.getAttribute('name'),
      value: e.checked
    }));

  return dataInput.concat(dataCheckbox);
};
