import { loadMapApi } from '../utils/http';

const generateLatLng = (lat, lng) => new window.google.maps.LatLng(lat, lng);

@Wrapper({
  name: 'gmap',
  options: {
    disableDefaultUI: true,
    zoom: 5
  }
})
export default class GMap extends Plugin {
  async init () {
    const { Map } = await loadMapApi();
    const props = this.props;

    props.map = new Map(this.$element[0], Object.assign({}, this.options, {
      center: generateLatLng(51.508742, -0.120850)
    }));
  }
}
