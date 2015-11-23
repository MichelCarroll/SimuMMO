
import GameObject from './GameObject';
import Container from './Container';


export default class Location extends GameObject {

  constructor() {
    super();
    this.beings = new Container(this);
    this.immobiles = new Container(this);
    this.adjacentLocations = new Container(this, true);
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['location']);
  }

}
