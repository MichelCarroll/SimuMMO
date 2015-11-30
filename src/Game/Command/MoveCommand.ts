
import GameObject from '../GameObject';

export default class MoveCommand {

  gameObject:GameObject;
  location:GameObject;

  constructor(gameObject:GameObject, location:GameObject) {
    this.gameObject = gameObject;
    this.location = location;
  }

  execute() {
    this.gameObject.getParent().remove(this.gameObject);
    this.location.add(this.gameObject);
  }

  describe() {
    return `Being #${this.gameObject.id} moved to #${this.location.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

  getReward():number {
    return 0;
  }
}
