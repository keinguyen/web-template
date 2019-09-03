@Plugin({
  options: {
    rows: 0
  }
})
export default class Slider {
  init () {
    this.$element.slick(this.options);
  }
}
