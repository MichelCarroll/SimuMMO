


export default class World {

  constructor() {
    this.locations = [];
  }

  addLocation(location) {
    this.locations.push(location);
  }

  moveBeing(being, newLocation) {
    let oldLocation = being.getLocation();
    if(oldLocation) {
      oldLocation.removeBeing(being);
    }
    being.setLocation(newLocation);
    newLocation.addBeing(being);
  }

}
