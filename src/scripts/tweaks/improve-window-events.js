import { $win } from '../utils/doms';
import { wait, waitTmp } from '../utils/index';
import { RESIZE_TIME } from '../utils/variables';

import layout from '../utils/layout';

let passiveIfSupported = false;
let lastWinScroll = layout.scroll;
let resizeTimeout = waitTmp;
let lastWinWidth = layout.width;
let lastWinHeight = layout.height;
let lastBreakpointIsDesktop = layout.isDesktop;

try {
  const passive = Object.defineProperty({}, 'passive', {
    get () {
      passiveIfSupported = { passive: true };

      return true;
    }
  });

  window.addEventListener('test', null, passive);
} catch (err) { /**/ }

window.addEventListener('scroll', () => {
  const currentWinScroll = layout.scroll;

  if (currentWinScroll === lastWinScroll) {
    return;
  }

  const name = currentWinScroll < lastWinScroll ? 'up' : 'down';

  $win.trigger(`scroll:${name}`, currentWinScroll);

  lastWinScroll = currentWinScroll;
}, passiveIfSupported);

$win.off('resize.improve').on('resize.improve', async () => {
  resizeTimeout.cancel();
  resizeTimeout = wait(RESIZE_TIME);
  await resizeTimeout;

  const currentWinWidth = layout.width;
  const currentWinHeight = layout.height;

  $win.trigger('resized', [ currentWinWidth, currentWinHeight ]);

  if (lastWinWidth !== currentWinWidth) {
    $win.trigger('width-change', currentWinWidth);

    const currentBreakpointIsDesktop = layout.isDesktop;

    if (lastBreakpointIsDesktop !== currentBreakpointIsDesktop) {
      // Prevent conflict event name with slick
      $win.trigger('breakpoint:change', currentWinWidth);

      const breakpointEvtName = currentBreakpointIsDesktop
        ? 'desktop'
        : 'mobile';

      $win.trigger(`breakpoint:${breakpointEvtName}`, currentWinWidth);

      lastBreakpointIsDesktop = currentBreakpointIsDesktop;
    }

    lastWinWidth = currentWinWidth;
  }

  if (lastWinHeight !== currentWinHeight) {
    $win.trigger('height-change', currentWinHeight);

    lastWinHeight = currentWinHeight;
  }
});
