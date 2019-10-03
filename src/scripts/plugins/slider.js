import { isRTL } from '../utils/layout';
@Plugin({
  options: {
    rtl: isRTL,
    rows: 0,
  }
})
export default class Slider {
  init () {
    this.$element.slick(this.options);
  }
}
