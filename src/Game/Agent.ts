
import GameObject from './GameObject';
import {Command} from './Command';

export default class Agent {

  target:any;
  turnsToWait:number;

  constructor(target:GameObject) {
    this.turnsToWait = 0;
    this.target = target;
  }

  processTurn(commandCallback:(cmd:Command)=>void):boolean {
    if(!this.turnsToWait--) {
      this.turnsToWait = this.takeTurn(commandCallback);
      return true;
    }
    return false;
  }

  takeTurn(commandCallback:(cmd:Command)=>void) {
    return 0;
  }

}
