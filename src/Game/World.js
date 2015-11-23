


export default class World {

  constructor() {
    this.locations = [];
  }

  addLocation(location) {
    this.locations.push(location);
  }

  getLocations() {
    return this.locations;
  }

}
