import {
  $win
} from '../utils/doms';

import {
  resizeDuration
} from '../utils/variables';

import layout from '../utils/layout';

let resizeTimeout;
let lastWinWidth = layout.width;
let lastWinHeight = layout.height;
let lastBreakpointIsDesktop = layout.isDesktop;
let lastWinScroll = layout.scroll;

$win
  .off('resize.improve')
  .on('resize.improve', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      let currentWinWidth = layout.width;
      let currentWinHeight = layout.height;

      $win.trigger('resized', [ currentWinWidth, currentWinHeight ]);

      if (lastWinWidth !== currentWinWidth) {
        $win.trigger('width-change', currentWinWidth);

        let currentBreakpointIsDesktop = layout.isDesktop;

        if (lastBreakpointIsDesktop !== currentBreakpointIsDesktop) {
          // Prevent conflict event name with slick
          $win.trigger('breakpoint:change', currentWinWidth);

          let breakpointEvtName = currentBreakpointIsDesktop
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
    }, resizeDuration);
  })
  .off('scroll.improve')
  .on('scroll.improve', () => {
    let currentWinScroll = layout.scroll;

    let scrollName = 'stand';

    if (currentWinScroll < lastWinScroll) {
      scrollName = 'up';
    } else if (currentWinScroll > lastWinScroll) {
      scrollName = 'down';
    }

    $win.trigger(`scroll:${scrollName}`, currentWinScroll);

    lastWinScroll = currentWinScroll;
  });
