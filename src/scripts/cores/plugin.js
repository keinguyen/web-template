const states = {
  loading: 0,
  interactive: 1,
  complete: 2
};

const READY_STATE = 'DOMContentLoaded';

function getElementData (el) {
  const elDataset = el.dataset;

  return Object.keys(elDataset).reduce((obj, key) => {
    let data = {};

    if (elDataset[key]) {
      data[key] = '';

      try {
        data[key] = JSON.parse(elDataset[key]);
      } catch (err) {
        data[key] = elDataset[key];
      }
    }

    return { ...obj, ...data };
  }, {});
}

function setupClass (Class, element, options) {
  const pluginName = Class.name.toKebabCase();
  const _this = new Class();

  _this.__pluginName = pluginName;
  _this.$element = $(element);
  _this.options = $.extend(
    {},
    $.fn[pluginName].defaults,
    getElementData(element),
    options
  );
  _this.props = {};

  typeof _this.init === 'function' && _this.init();

  return _this;
}

export default function Plugin (param) {
  function createPlugin (Class) {
    const baseName = Class.name;
    const name = baseName.toKebabCase();
    const options = (param && param.options) || {};
    const loadEvent = (param && param.when) || READY_STATE;
    const selector = param && param.selector;

    function init () {
      $(`[data-${name}]`)[name]();

      if (typeof selector === 'string') {
        $(selector)[name]();
      }
    }

    $.fn[name] = function (opts, params) {
      return this.each(function () {
        const instance = $.data(this, `${name}-instance`);

        if (instance instanceof Class) {
          if (typeof instance[opts] === 'function') {
            instance[opts](params);
          } else {
            console.error(`This element has been initialized with plugin ${baseName}, please provide correct method`);
          }
        } else {
          $.data(this, `${name}-instance`, setupClass(Class, this, opts));
        }
      });
    };

    $.fn[name].defaults = options;

    if (loadEvent === READY_STATE && states[document.readyState] > 0) {
      init();
    } else {
      window.addEventListener(loadEvent, init);
    }

    return Class;
  }

  return typeof param === 'function' ? createPlugin(param) : createPlugin;
}
