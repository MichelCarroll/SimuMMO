
import MoveCommand from '../Command/MoveCommand';
import KillCommand from '../Command/KillCommand';
import Agent from '../Agent';

export default class PlayerAgent extends Agent {

  takeTurn(commandCallback) {
    let targetLocation = this.target.getContainer().adjacentLocations.oneOfType('dungeon');
    commandCallback(new MoveCommand(this.target, targetLocation));

    let targetMonster = this.target.getContainer().beings.oneOfType('monster');
    commandCallback(new KillCommand(this.target, targetMonster));

    targetLocation = this.target.getContainer().adjacentLocations.oneOfType('town');
    commandCallback(new MoveCommand(this.target, targetLocation));
  }

}
