import {
  $doc
} from '../utils/doms';

$doc
  .off('keydown.active-element')
  .on('keydown.active-element', (evt) => {
    let keyCode = evt.keyCode;
    let target = document.activeElement;

    if (!target) {
      return;
    }

    let hasTabIndex = target.getAttribute('data-tabindex');

    if ((keyCode === 13 || keyCode === 32) && hasTabIndex) {
      evt.preventDefault();
      target.click();
    }
  });
