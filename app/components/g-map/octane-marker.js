import Component from '@glimmer/component';

export default class GMapOctaneMarkerComponent extends Component {
  _type = 'newMarker';

  constructor(_, args) {
    super(...arguments);

    new google.maps.Marker({ map: args.map, position: { lat: args.lat, lng: args.lng } });
  }
}
