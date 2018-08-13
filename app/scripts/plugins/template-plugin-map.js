import { Plugin, Wrapper } from '@/plugin';
import { loadMapApi } from '../utils/http';

@Wrapper({
  name: 'template-plugin-map'
})
export default class TemplatePluginMap extends Plugin {
  async init () {
    await loadMapApi();

    console.log(window.google.maps);
  }
}
