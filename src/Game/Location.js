
import GameObject from './GameObject';

export default class Location extends GameObject {

  constructor() {
    super();
    this.beings = [];
    this.adjacentLocations = [];
  }

  addAdjacentLocation(location) {
    this.adjacentLocations.push(location);
  }

  getAdjacentLocations() {
    return this.adjacentLocations;
  }

  addBeing(being) {
    this.beings.push(being);
  }

  removeBeing(targetBeing) {
    this.beings.splice(this.beings.findIndex(function(being) { return targetBeing.id === being.id; }), 1);
  }

  getBeings() {
    return this.beings;
  }

  getObjectType() {
    return 'location';
  }

}
