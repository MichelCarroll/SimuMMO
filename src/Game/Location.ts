
import GameObject from './GameObject';
import Referencer from './Referencer';


export default class Location extends GameObject {

  adjacentLocations:GameObject;

  constructor(types:string[]) {
    super(types);
    this.adjacentLocations = new Referencer();
  }

}
