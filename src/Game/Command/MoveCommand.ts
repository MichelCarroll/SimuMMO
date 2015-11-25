
import Being from '../Being';
import Location from '../Location';

export default class MoveCommand {

  being:Being;
  location:Location;

  constructor(being:Being, location:Location) {
    this.being = being;
    this.location = location;
  }

  execute() {
    this.being.getParent().remove(this.being);
    this.location.add(this.being);
  }

  describe() {
    return `Being #${this.being.id} moved to #${this.location.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }
}
