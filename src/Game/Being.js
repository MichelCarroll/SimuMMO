
import GameObject from './GameObject';


export default class Being extends GameObject {

  constructor() {
    super();
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

}
