import layout from './layout';

const s4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);

export const regExEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const regExYT = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^/&]{10,12})/;

export const resizeDuration = 180;
export const keyupDuration = 200;

export const generateGUID = (prefix = 'class') => {
  return `${prefix}-${s4()+s4()}-${s4()}-${s4()}-${s4()}-${s4()+s4()+s4()}`
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
}
