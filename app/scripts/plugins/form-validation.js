@Wrapper({
  name: 'form-validation',
  options: {
    triggerAfterFailure: 'input change',
    excluded: [
      'input[type=button]',
      'input[type=submit]',
      'input[type=reset]',
      '[disabled]',
      ':hidden:not([name="g-recaptcha-response"])'
    ].join('')
  }
})
export default class FormValidation extends Plugin {
  init () {
    this.$element.parsley(this.options);
  }
}
