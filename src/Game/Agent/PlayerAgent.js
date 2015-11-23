
import MoveCommand from '../Command/MoveCommand';
import KillCommand from '../Command/KillCommand';
import Agent from '../Agent';

export default class PlayerAgent extends Agent {

  takeTurn() {
    let targetLocation = this.target.getContainer().adjacentLocations.oneOfType('dungeon');
    this.commandCallback(new MoveCommand(this.target, targetLocation));

    let targetMonster = this.target.getContainer().beings.oneOfType('monster');
    this.commandCallback(new KillCommand(this.target, targetMonster));

    targetLocation = this.target.getContainer().adjacentLocations.oneOfType('town');
    this.commandCallback(new MoveCommand(this.target, targetLocation));
  }

}
