import { setComponentManager } from '@ember/component';
import { createMapComponentManger } from '../../component-managers/map-component';


class GMapNewMarkerComponent {
  _type = 'newMarker';

  constructor(_, args) {
    new google.maps.Marker({
      map: args.map,
      position: { lat: args.lat, lng: args.lng }
    });
  }
}

export default setComponentManager(createMapComponentManger, GMapNewMarkerComponent);
