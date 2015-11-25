
import {Command} from '../Command';
import MoveCommand from '../Command/MoveCommand';
import KillCommand from '../Command/KillCommand';
import RestCommand from '../Command/RestCommand';
import WaitCommand from '../Command/WaitCommand';
import Agent from '../Agent';
import Being from '../Being';

export default class PlayerAgent extends Agent {

  getCommand():Command {
    let isInTown = this.target.getContainer().isA('town');
    let isInjured = this.target.isInjured();
    let monsterIsPresent = !!this.target.getContainer().contents.oneOfType('monster');

    if(isInjured && !isInTown)
    {
      return new MoveCommand(
        this.target,
        this.target.getContainer().adjacentLocations.oneOfType('town')
      );
    }
    else if(isInjured && isInTown)
    {
      return new RestCommand(this.target);
    }
    else if(isInTown)
    {
      return new MoveCommand(
        this.target,
        this.target.getContainer().adjacentLocations.oneOfType('dungeon')
      );
    }
    else if(monsterIsPresent) {
      return new KillCommand(
        this.target,
        this.target.getContainer().contents.oneOfType('monster')
      );
    }
    else if(!monsterIsPresent) {
      return new MoveCommand(
        this.target,
        this.target.getContainer().adjacentLocations.oneOfType('town')
      );
    }

    return new WaitCommand();
  }
}
