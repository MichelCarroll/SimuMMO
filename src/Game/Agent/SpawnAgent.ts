
import Agent from '../Agent';
import {Command} from '../Command';
import {Action} from './Action';
import SpawnMonsterAction from './Action/SpawnMonsterAction';
import WaitCommand from '../Command/WaitCommand';

export default class SpawnAgent extends Agent {

  processTurn(executor:(cmd:Command)=>void, onDone:()=>void) {
    if(this.turnsToWait-- > 0) {
      executor(new WaitCommand());
    }
    else {
      let command = (new SpawnMonsterAction(this.target)).retrieveCommand();
      this.turnsToWait += command.getTurnCooldown();
      executor(command);
    }
    onDone();
  }
}
