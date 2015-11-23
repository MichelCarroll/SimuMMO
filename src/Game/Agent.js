
import MoveCommand from './Command/MoveCommand';
import KillCommand from './Command/KillCommand';

export default class Agent {

  constructor(being, commandCallback) {
    this.being = being;
    this.commandCallback = commandCallback;
  }

  takeTurn() {
    let targetLocation = this.being.getLocation().adjacentLocations.oneOfType('dungeon');
    this.commandCallback(new MoveCommand(this.being, targetLocation));

    let targetMonster = this.being.getLocation().beings.oneOfType('monster');
    this.commandCallback(new KillCommand(this.being, targetMonster));
  }

}
