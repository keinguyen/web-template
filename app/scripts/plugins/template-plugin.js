import { Plugin, Wrapper } from '@/plugin';

@Wrapper({
  name: 'template-plugin'
})
export default class TemplatePlugin extends Plugin {
  init () {
    console.log(this);
  }
}
