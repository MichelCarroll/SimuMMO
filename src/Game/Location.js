
import GameObject from './GameObject';

export default class Location extends GameObject {

  constructor() {
    super();
    this.beings = [];
  }

  addBeing(being) {
    this.beings.push(being);
  }

  removeBeing(targetBeing) {
    this.beings.splice(this.beings.findIndex(function(being) { return targetBeing.id === being.id; }), 1);
  }

}
