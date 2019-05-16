@Wrapper
export default class TemplatePlugin extends Plugin {
  init () {
    this.$element.text('template initialized');
  }
}
