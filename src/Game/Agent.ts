
import GameObject from './GameObject';
import {Command} from './Command';
import WaitCommand from './Command/WaitCommand';
import {Action} from './Agent/Action';

export default class Agent {

  target:any;
  turnsToWait:number;

  constructor(target:GameObject) {
    this.turnsToWait = 0;
    this.target = target;
  }

  getPossibleActions():Action[] {
    return [];
  }

  getCommand():Command {
    let command = new WaitCommand();
    let pool = this.getPossibleActions().filter((action:Action) => {
      return action.canExecute();
    }).sort(() => { return 0.5 - Math.random() });

    if(pool.length) {
      return pool[0].retrieveCommand();
    }
    
    return command;
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
