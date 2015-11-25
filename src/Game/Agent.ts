
import GameObject from './GameObject';
import {Command} from './Command';
import WaitCommand from './Command/WaitCommand';

export default class Agent {

  target:any;
  turnsToWait:number;

  constructor(target:GameObject) {
    this.turnsToWait = 0;
    this.target = target;
  }

  getCommand():Command {
    return new WaitCommand();
  }

  processTurn():Command {
    if(this.turnsToWait-- > 0) {
      return new WaitCommand();
    }

    let command = this.getCommand();
    this.turnsToWait += command.getTurnCooldown();
    return command;
  }

  takeTurn(commandCallback:(cmd:Command)=>void) {
    return 0;
  }

}
