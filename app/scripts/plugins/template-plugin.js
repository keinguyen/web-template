const $ = window.jQuery;

const pluginName = 'template-plugin';

class TemplatePlugin {
  constructor (element, options) {
    this.$element = $(element);
    this.options = $.extend(
      {},
      $.fn[pluginName].defaults,
      this.$element.data(),
      options
    );

    this.init();
  }

  init () {
    console.log(pluginName, this);
  }

  destroy () {
    $.removeData(this.element[0], pluginName);
  }
}

$.fn[pluginName] = function (options, params) {
  return this.each(function () {
    const instance = $.data(this, `${pluginName}-instance`);
    if (!instance || typeof instance === 'string') {
      $.data(
        this,
        `${pluginName}-instance`,
        new TemplatePlugin(this, options)
      );
    } else if (instance[options]) {
      instance[options](params);
    }
  });
};

$.fn[pluginName].defaults = {
};

$(() => {
  $(`[data-${pluginName}]`)[pluginName]();
});
