
import MoveCommand from './Command/MoveCommand';

export default class Agent {

  constructor(being, commandCallback) {
    this.being = being;
    this.commandCallback = commandCallback;
  }

  takeTurn() {
    let target = this.being.getLocation().getAdjacentLocations()[0];
    this.commandCallback(new MoveCommand(this.being, target));
  }

}
