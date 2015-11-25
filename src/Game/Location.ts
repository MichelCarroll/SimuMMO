
import GameObject from './GameObject';
import Container from './Container';


export default class Location extends GameObject {

  adjacentLocations:Container;

  constructor(types:string[]) {
    super(types);
    this.adjacentLocations = new Container();
  }

}
