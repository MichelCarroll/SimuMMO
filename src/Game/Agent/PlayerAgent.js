
import MoveCommand from '../Command/MoveCommand';
import KillCommand from '../Command/KillCommand';
import RestCommand from '../Command/RestCommand';
import Agent from '../Agent';

export default class PlayerAgent extends Agent {

  takeTurn(commandCallback) {
    if(this.target.getContainer().isA('town')) {
      if(this.target.isInjured()) {
        commandCallback(new RestCommand(this.target));
      } else {
        let targetLocation = this.target.getContainer().adjacentLocations.oneOfType('dungeon');
        commandCallback(new MoveCommand(this.target, targetLocation));
      }
    }
    else {
      if(this.target.isInjured()) {
        let targetLocation = this.target.getContainer().adjacentLocations.oneOfType('town');
        commandCallback(new MoveCommand(this.target, targetLocation));
      } else {
        let targetMonster = this.target.getContainer().beings.oneOfType('monster');
        commandCallback(new KillCommand(this.target, targetMonster));
      }
    }
  }

}
