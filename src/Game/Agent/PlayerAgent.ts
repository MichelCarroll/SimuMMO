

declare function require(str:string):any;

import {Command} from '../Command';
import MoveCommand from '../Command/MoveCommand';
import KillCommand from '../Command/KillCommand';
import RestCommand from '../Command/RestCommand';
import WaitCommand from '../Command/WaitCommand';
import SellLootCommand from '../Command/SellLootCommand';
import Agent from '../Agent';
import Being from '../Being';

export default class PlayerAgent extends Agent {

  getCommand():Command {
    let isInTown = this.target.getParent().isA('town');
    let isInjured = this.target.isInjured();
    let monsterIsPresent = !!this.target.getParent().oneOfType('monster');
    let hasLoot = !!this.target.oneOfType('item');
    let shopkeepIsAround = !!this.target.getParent().oneOfType('shopkeep');

    if(isInjured && !isInTown)
    {
      return new MoveCommand(
        this.target,
        this.target.getParent().adjacentLocations.oneOfType('town')
      );
    }
    else if(isInjured && isInTown)
    {
      return new RestCommand(this.target);
    }
    else if(isInTown && hasLoot && shopkeepIsAround)
    {
      return new SellLootCommand(
        this.target,
        this.target.getParent().oneOfType('shopkeep')
      );
    }
    else if(isInTown)
    {
      return new MoveCommand(
        this.target,
        this.target.getParent().adjacentLocations.oneOfType('dungeon')
      );
    }
    else if(monsterIsPresent) {
      return new KillCommand(
        this.target,
        this.target.getParent().oneOfType('monster')
      );
    }
    else if(!monsterIsPresent) {
      return new MoveCommand(
        this.target,
        this.target.getParent().adjacentLocations.oneOfType('town')
      );
    }

    return new WaitCommand();
  }
}
