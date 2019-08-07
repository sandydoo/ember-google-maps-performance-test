import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { action } from '@ember/object';


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


export default class ApplicationController extends Controller {
  @service googleMapsApi;

  @tracked showOldMarkers;
  @tracked showOctaneMarkers;
  @tracked showCustomMarkers;
  @tracked showHelperMarkers;

  showOldMarkers = false;
  showOctaneMarkers = false;
  showCustomMarkers = false;
  showHelperMarkers = false;

  @reads('googleMapsApi.google') google;
  @reads('googleMapsApi.google.isFulfilled') googleLoaded;

  london = {
    lat: 51.507568,
    lng: -0.127762
  };

  @computed('googleLoaded')
  get londonLocations() {
    if (!this.googleLoaded) { return []; }

    let { lat, lng } = this.london;
    let origin = new google.maps.LatLng(lat, lng);

    return Array(1000).fill().map((_e, i) => {
      let heading = randomInt(1, 360);
      let distance = randomInt(100, 5000);
      let price = randomInt(0, 2000);
      let n = google.maps.geometry.spherical.computeOffset(origin, distance, heading);
      let type = randomInt(1, 5);

      return { id: i, lat: n.lat(), lng: n.lng(), price, type };
    });
  }

  @action
  getMapInstance({ map }) {
    this.map = map;
  }

  @action
  async testInSequence() {
    console.log('Drawing old markers');
    this.toggleOldMarkers();

    await wait(10000);

    console.log('Drawing octane markers');
    this.toggleOctaneMarkers();

    await wait(10000);

    console.log('Drawing custom markers');
    this.toggleCustomMarkers();

    await wait(10000);

    console.log('Drawing helper markers');
    this.toggleHelperMarkers();

    await wait(10000);

    console.log('Drawing markers');
    this.drawMarkers();
  }

  @action
  drawMarkers() {
    this.londonLocations.forEach((loc) => {
      new google.maps.Marker({
        map: this.map,
        position: { lat: loc.lat, lng: loc.lng }
      });
    });
  }

  @action
  toggleOldMarkers() {
    this.showOldMarkers = !this.showOldMarkers;
  }

  @action
  toggleOctaneMarkers() {
    this.showOctaneMarkers = !this.showOctaneMarkers;
  }

  @action
  toggleCustomMarkers() {
    this.showCustomMarkers = !this.showCustomMarkers;
  }

  @action
  toggleHelperMarkers() {
    this.showHelperMarkers = !this.showHelperMarkers;
  }
}
