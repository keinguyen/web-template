import {
  $win,
  $html,
  $body,
  $fixed
} from './doms';

// Refer to responsive breakpoints
const RESPONSIVE_BREAKPOINTS = {
  tablet: 768,
  desktop: 992
};

let lockTimeout;
let lastScroll;

function calculateScrollWidth () {
  let tempDiv = document.createElement('div');

  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '0px';
  tempDiv.style.left = '0px';
  tempDiv.style.width = '100%';
  tempDiv.style.height = '50px';

  document.body.appendChild(tempDiv);

  let fullWidth = tempDiv.offsetWidth;

  tempDiv.style.overflowY = 'scroll';

  let limitWidth = tempDiv.clientWidth;

  document.body.removeChild(tempDiv);

  return fullWidth - limitWidth;
}


export const lang = $html.attr('lang');
export default {
  lang,
  scrollWidth: calculateScrollWidth(),
  breakpoints: RESPONSIVE_BREAKPOINTS,
  isRTL: $html.attr('dir') === 'rtl',
  isIOS: $html.hasClass('ios'),
  isIE: $html.is('.ie, .edge'),

  get screenWidth () {
    return window.innerWidth;
  },

  get width () {
    return document.body.clientWidth;
  },

  get height () {
    return window.innerHeight;
  },

  get isFrozen () {
    return $body.hasClass('freeze');
  },

  get bodyHeight () {
    return $body.outerHeight();
  },

  get isTablet () {
    let pageWidth = this.screenWidth;

    return (
      pageWidth >= RESPONSIVE_BREAKPOINTS.tablet &&
      pageWidth < RESPONSIVE_BREAKPOINTS.desktop
    );
  },

  get isDesktop () {
    return this.screenWidth >= RESPONSIVE_BREAKPOINTS.desktop;
  },

  get isMobile () {
    return !this.isDesktop;
  },

  get isSmallScreen () {
    return !this.isDesktop && !this.isTablet;
  },

  get scroll () {
    return $win.scrollTop();
  },

  freeze () {
    clearTimeout(lockTimeout);
    lockTimeout = setTimeout(() => {
      let willBeFrozen = this.bodyHeight > this.height && !this.isFrozen;

      if (!willBeFrozen) {
        return false;
      }

      if (this.isIOS) {
        lastScroll = this.scroll;
        $body.css('top', -lastScroll);
      }

      let borderRight = `${this.scrollWidth}px solid #fff`;

      $body
        .addClass('freeze')
        .css({
          borderRight,
          paddingRight: ''
        });

      $fixed.css('border-right', function () {
        let position = window
          .getComputedStyle(this)
          .getPropertyValue('position');

        let condition = this.classList.contains('component-header')
          || position === 'fixed';

        return condition ? borderRight : '';
      });

      return true;
    });
  },

  unfreeze (callback) {
    clearTimeout(lockTimeout);
    lockTimeout = setTimeout(() => {
      if (!this.isFrozen) {
        typeof callback === 'function' && callback();
        return false;
      }

      $body
        .removeClass('freeze')
        .css({
          borderRight: ''
        });

      $fixed.css('border-right', '');

      if (this.isIOS) {
        $body.css('top', '');
        window.scrollTo(0, lastScroll);
        window.isUnfreezing = true;

        setTimeout(() => {
          window.isUnfreezing = false;
          typeof callback === 'function' && callback();
        }, 50);
      } else {
        typeof callback === 'function' && callback();
      }

      return true;
    });
  }
};
