// Initializations
import './initializations/promise-polyfill';
import './initializations/import-jquery-plugins';
import './initializations/lazyload';

// Tweaks
import './tweaks/improve-window-events';
import './tweaks/add-active-state';
import './tweaks/active-element-with-enter';

// Plugins
import * as Plugins from './plugins/*.js';

export default Plugins;
