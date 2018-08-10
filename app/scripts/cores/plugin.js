import $ from 'jquery';

export function Wrapper ({ name, options = {} } = {}) {
  return (Class) => {
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
            new Class(this, options, name)
          );
        } else if (instance[options]) {
          instance[options](params);
        }
      });
    };

    $.fn[name].defaults = options;

    if (window.XA) {
      window.XA.component[name] = {
        init
      };

      window.XA.register(name, window.XA.component[name]);
    } else {
      $(init);
    }

    return Class;
  }
}

export class Plugin {
  constructor (element, options, pluginName) {
    this.$element = $(element);
    this.options = $.extend(
      { pluginName },
      $.fn[pluginName].defaults,
      this.$element.data(),
      options
    );
    this.props = {};

    typeof this.init === 'function' && window.setTimeout(this.init.bind(this));
  }

  destroy () {
    $.removeData(this.$element[0], `${this.options.pluginName}-instance`);
  }
}
