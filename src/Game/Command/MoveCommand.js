


export default class MoveCommand {

  constructor(being, location) {
    this.being = being;
    this.location = location;
  }

  execute() {
    this.being.getContainer().beings.remove(this.being);
    this.location.beings.add(this.being);
  }

}
