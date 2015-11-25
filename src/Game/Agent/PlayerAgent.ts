
import {Command} from '../Command';
import MoveCommand from '../Command/MoveCommand';
import KillCommand from '../Command/KillCommand';
import RestCommand from '../Command/RestCommand';
import Agent from '../Agent';
import Player from '../Being/Player';

export default class PlayerAgent extends Agent {

  takeTurn(commandCallback:(cmd:Command)=>void) {
    let isInTown = this.target.getContainer().isA('town');
    let isInjured = this.target.isInjured();
    let monsterIsPresent = !!this.target.getContainer().beings.oneOfType('monster');

    if(isInjured && !isInTown)
    {
      commandCallback(new MoveCommand(
        this.target,
        this.target.getContainer().adjacentLocations.oneOfType('town')
      ));
    }
    else if(isInjured && isInTown)
    {
      commandCallback(new RestCommand(this.target));
    }
    else if(isInTown)
    {
      commandCallback(new MoveCommand(
        this.target,
        this.target.getContainer().adjacentLocations.oneOfType('dungeon')
      ));
    }
    else if(monsterIsPresent) {
      commandCallback(new KillCommand(
        this.target,
        this.target.getContainer().beings.oneOfType('monster')
      ));
    }
    else if(!monsterIsPresent) {
      commandCallback(new MoveCommand(
        this.target,
        this.target.getContainer().adjacentLocations.oneOfType('town')
      ));
    }
    else {
      commandCallback(new RestCommand(this.target));
    }

    return 0;
  }
}
