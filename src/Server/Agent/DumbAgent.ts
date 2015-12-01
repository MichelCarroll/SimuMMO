
import {Agent} from '../Agent';
import GameObject from '../GameObject';
import {Command} from '../Command';
import {Action} from './Action';
import SpawnMonsterAction from './Action/SpawnMonsterAction';
import WaitCommand from '../Command/WaitCommand';

export default class SpawnAgent implements Agent {

  turnsToWait:number;
  target:GameObject;

  constructor(target:GameObject) {
    this.turnsToWait = 0;
    this.target = target;
  }

  getCommand():Command {
    return new WaitCommand();
  }

  processTurn(executor:(cmd:Command)=>void):boolean {
    if(this.turnsToWait-- > 0) {
      executor(new WaitCommand());
      return false;
    }

    let command = this.getCommand();
    this.turnsToWait += command.getTurnCooldown();
    executor(command);

    return true;
  }
}
