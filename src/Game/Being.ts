
import GameObject from './GameObject';
import Location from './Location';


export default class Being extends GameObject {

  location:Location;

  constructor() {
    super();
  }

  getLocation():Location {
    return this.location;
  }

  setLocation(location:Location) {
    this.location = location;
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['being']);
  }

}
