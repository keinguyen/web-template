import { $win } from '../utils/doms';
import { loadCaptchaApi } from '../utils/http';
import {
  RECAPTCHA_KEY as sitekey
} from '../utils/variables';

const hasParsley = !!$.fn.parsley;

@Wrapper({
  runOnload: true,
  options: {
    required: true
  }
})
export default class Recaptcha extends Plugin {
  async init () {
    await loadCaptchaApi();

    this.createCaptcha();
    this.updateInputAttr();
    this.handleEvents();
  }

  createCaptcha () {
    if (this.props.captcha) {
      return;
    }

    const $el = this.$element;

    this.props.captcha = window.grecaptcha.render($el[0], {
      sitekey,
      callback: (token) => {
        $el.trigger('captcha:change', token);
        this.updateInput();
      },
      'expired-callback': () => {
        $el.trigger('captcha:expired');
        setTimeout(this.updateInputAttr.bind(this), 1000);
      },
      'error-callback' () {
        $el.trigger('captcha:error');
      }
    });
  }

  updateInputAttr () {
    const { required, parsleyRequiredMessage = '' } = this.options;
    const requiredMessage = hasParsley && required
      ? parsleyRequiredMessage
      : '';

    this.$input = this.$element.find('textarea');

    this.$input
      .prop('required', required)
      .attr('data-parsley-required-message', requiredMessage);
  }

  handleEvents () {
    const { pluginName } = this.options;
    const onResizeCaptcha = this.resize.bind(this);

    this.$element
      .off(`reset.${pluginName}`)
      .on(`reset.${pluginName}`, this.reset.bind(this))
      .off('captcha:resize')
      .on('captcha:resize', onResizeCaptcha);

    $win.on(`width-change.${pluginName}`, onResizeCaptcha);
  }

  updateInput () {
    this.$input.trigger('change').trigger('input');
  }

  resize () {
    if (!this.$element.is(':visible')) {
      return;
    }

    const $iframe = this.$element.find('iframe');

    $iframe.css('transform', '');

    const ratio = this.$element.outerWidth() / $iframe.outerWidth();

    ratio < 1 && $iframe.css('transform', `scale(${ratio})`);
  }

  reset () {
    window.grecaptcha.reset(this.props.captcha);
  }
}
