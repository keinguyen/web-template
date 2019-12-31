import { loadMapApi } from '../utils/http'

let Maps

function generateLatLng (lat, lng) {
  return new Maps.LatLng(lat, lng)
}

@Plugin({
  options: {
    disableDefaultUI: true,
    zoom: 5
  }
})
export default class Gmap {
  async init () {
    Maps = await loadMapApi()

    const mapOpts = {
      ...this.options,
      center: generateLatLng(51.508742, -0.120850)
    }

    this.props.map = new Maps.Map(this.$element[0], mapOpts)
  }
}
