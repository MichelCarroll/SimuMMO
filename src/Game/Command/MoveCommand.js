


export default class MoveCommand {

  constructor(world, being, location) {
    this.world = world;
    this.being = being;
    this.location = location;
  }

  execute() {
    this.world.moveBeing(this.being, this.location);
  }

}
