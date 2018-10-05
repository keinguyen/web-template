import { $win } from '../utils/doms';

export function Wrapper (param) {
  let options = {};
  let runOnload = false;

  const createPlugin = Class => {
    let name = Class.name.toKebabCase();

    function init () {
      $(`[data-${name}]`)[name]();
    }

    $.fn[name] = function (options, params) {
      return this.each(function () {
        const instance = $.data(this, `${name}-instance`);
        if (!instance) {
          $.data(
            this,
            `${name}-instance`,
            new Class(this, options)
          );
        } else if (instance[options]) {
          instance[options](params);
        }
      });
    };

    $.fn[name].defaults = options;

    if (runOnload) {
      $win.on('load', init);
    } else {
      $(init);
    }

    return Class;
  };

  if (param instanceof Function) {
    return createPlugin(param);
  }

  if (param) {
    options = param.options || options;
    runOnload = param.runOnload || runOnload;
  }

  return createPlugin;
}

export class Plugin {
  constructor (element, options) {
    let pluginName = this.constructor.name.toKebabCase();

    this.$element = $(element);
    this.options = $.extend(
      { pluginName },
      $.fn[pluginName].defaults,
      this.$element.data(),
      options
    );
    this.props = {};

    typeof this.init === 'function' && this.init();
  }
}
