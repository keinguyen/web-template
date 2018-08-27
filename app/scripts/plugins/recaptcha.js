import { $win } from '../utils/doms';
import { loadCaptchaApi } from '../utils/http';
import {
  RECAPTCHA_KEY as sitekey
} from '../utils/variables';

const hasParsley = !!$.fn.parsley;

@Wrapper({
  name: 'recaptcha',
  options: {
    required: true
  }
})
export default class ReCaptcha extends Plugin {
  async init () {
    await loadCaptchaApi();

    this.createInput();
    this.createCaptcha();
    this.handleEvents();
  }

  createInput () {
    if (this.$input) {
      return false;
    }

    const { required, parsleyRequiredMessage } = this.options;
    const requiredAttrStr = required ? 'required' : '';
    const parsleyAttrStr = hasParsley && required
      ? `data-parsley-required-message="${parsleyRequiredMessage || ''}"`
      : '';

    this.$input = $(`
      <input
        type="hidden"
        name="recaptcha"
        ${requiredAttrStr}
        ${parsleyAttrStr}
      />
    `);

    this.$element.after(this.$input);

    return true;
  }

  createCaptcha () {
    if (this.props.captcha) {
      return false;
    }

    const $el = this.$element;

    this.props.captcha = window.grecaptcha.render($el[0], {
      sitekey,
      callback: (token) => {
        $el.trigger('captcha:change', token);
        this.updateInput(token);
      },
      'expired-callback' () {
        $el.trigger('captcha:expired');
        this.updateInput();
      },
      'error-callback' () {
        $el.trigger('captcha:error');
      }
    });

    return true;
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

  updateInput (value = '') {
    this.$input.val(value).trigger('change').trigger('input');
  }

  resize () {
    if (!this.$element.is(':visible')) {
      return false;
    }

    const $iframe = this.$element.find('iframe');

    $iframe.css('transform', '');

    const ratio = this.$element.outerWidth() / $iframe.outerWidth();

    ratio < 1 && $iframe.css('transform', `scale(${ratio})`);

    return true;
  }

  reset () {
    window.grecaptcha.reset(this.props.captcha);
  }
}
