
import GameObject from './GameObject';
import Container from './Container';


export default class Location extends GameObject {

  contents:Container;
  adjacentLocations:Container;

  constructor() {
    super();
    this.contents = new Container(this);
    this.adjacentLocations = new Container(this, true);
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['location']);
  }

}
