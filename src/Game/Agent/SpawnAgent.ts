
import SpawnMonsterCommand from '../Command/SpawnMonsterCommand';
import Agent from '../Agent';
import {Command} from '../Command';

export default class SpawnAgent extends Agent {

  takeTurn(commandCallback:(cmd:Command)=>void) {
    commandCallback(new SpawnMonsterCommand(this.target));
    return 4;
  }

}
