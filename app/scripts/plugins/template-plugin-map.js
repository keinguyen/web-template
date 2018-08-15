import { loadMapApi } from '../utils/http';

@Wrapper({
  name: 'template-plugin-map'
})
export default class TemplatePluginMap extends Plugin {
  async init () {
    await loadMapApi();

    this.$element.text('google map initialized');
  }
}
