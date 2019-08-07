import { helper } from '@ember/component/helper';

export default helper(function helperMarker(_, { map, lat, lng}) {
  new google.maps.Marker({ map, position: { lat, lng }});
});
