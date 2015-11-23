


export default class MoveCommand {

  constructor(being, location) {
    this.being = being;
    this.location = location;
  }

  execute() {
    let oldLocation  = this.being.getLocation();
    if(oldLocation) {
      oldLocation.beings.remove(this.being);
    }
    this.being.setLocation(this.location);
    this.location.beings.add(this.being);
  }

}
