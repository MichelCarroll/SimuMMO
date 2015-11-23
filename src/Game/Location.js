
import GameObject from './GameObject';
import Container from './Container';


export default class Location extends GameObject {

  constructor() {
    super();
    this.beings = new Container();
    this.adjacentLocations = new Container();
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['location']);
  }

}
