import { $win, $html, $body } from './doms';
import { wait, waitTmp } from './index';
import { RESPONSIVE_BREAKPOINTS } from './variables';

const { TABLET, DESKTOP } = RESPONSIVE_BREAKPOINTS;

let lockTimeout = waitTmp;
let lastScroll;

function calculateScrollWidth () {
  const body = $body[0];
  const _div = document.createElement('div');

  _div.style.position = 'absolute';
  _div.style.top = '0px';
  _div.style.left = '0px';
  _div.style.width = '100%';
  _div.style.height = '50px';

  body.appendChild(_div);

  const fullWidth = _div.offsetWidth;

  _div.style.overflowY = 'scroll';

  const limitWidth = _div.clientWidth;

  body.removeChild(_div);

  const scrollWidth = fullWidth - limitWidth;

  body.classList.add(`--scroll-${scrollWidth}`);

  return scrollWidth;
}

export const scrollWidth = calculateScrollWidth();
export const lang = $html.attr('lang') || '';
export const isRTL = $html.attr('dir') === 'rtl';
export const isIOS = $html.hasClass('ios');
export const isIE = $html.is('.ie, .edge');

export default {
  scrollWidth,
  lang,
  isRTL,
  isIOS,
  isIE,

  get screenWidth () {
    return window.innerWidth;
  },

  get width () {
    return document.body.clientWidth;
  },

  get height () {
    return window.innerHeight;
  },

  get bodyHeight () {
    return document.body.clientHeight;
  },

  get isFrozen () {
    return $body.hasClass('freeze');
  },

  get isDesktop () {
    return this.screenWidth >= DESKTOP;
  },

  get isTablet () {
    let pageWidth = this.screenWidth;

    return (
      pageWidth >= TABLET &&
      pageWidth < DESKTOP
    );
  },

  get isMobile () {
    return !this.isDesktop;
  },

  get isSmallScreen () {
    return this.screenWidth < TABLET;
  },

  get scroll () {
    return $win.scrollTop();
  },

  set scroll (value) {
    window.scrollTo(0, value);
  },

  async freeze () {
    // Set Timeout
    lockTimeout.cancel();
    lockTimeout = wait();
    await lockTimeout;
    // End Timeout

    const shouldFreeze = this.bodyHeight > this.height && !this.isFrozen;

    if (!shouldFreeze) {
      return false;
    }

    if (this.isIOS) {
      lastScroll = this.scroll;
      $body.css('top', -lastScroll);
    }

    $body.addClass('freeze');

    return true;
  },

  async unfreeze () {
    // Set Timeout
    lockTimeout.cancel();
    lockTimeout = wait();
    await lockTimeout;
    // End Timeout

    if (!this.isFrozen) {
      return false;
    }

    window.isUnfreezing = true;

    $body.removeClass('freeze');

    if (this.isIOS) {
      $body.css('top', '');
      this.scroll = lastScroll;

      await wait(50);
    }

    window.isUnfreezing = false;

    return true;
  }
};
