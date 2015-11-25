
import SpawnMonsterCommand from '../Command/SpawnMonsterCommand';
import Agent from '../Agent';
import {Command} from '../Command';

export default class SpawnAgent extends Agent {

  getCommand():Command {
    return new SpawnMonsterCommand(this.target);
  }

}
