
import GameObject from './GameObject';
import Location from './Location';
import Inventory from './Components/Inventory';


export default class Being extends GameObject {

  inventory:Inventory;
  location:Location;
  health:number;

  constructor() {
    super();
    this.health = 100;
    this.inventory = new Inventory();
  }

  rest(points:number) {
    this.health += points;
  }

  injure(points:number) {
    this.health -= points;
  }

  isInjured():boolean {
    return this.health < 50;
  }

  getInventory():Inventory {
    return this.inventory;
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
