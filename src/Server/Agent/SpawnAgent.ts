
import {Command} from '../Command';
import SpawnMonsterCommand from '../Command/SpawnMonsterCommand';
import DumbAgent from './DumbAgent';

export default class SpawnAgent extends DumbAgent {

  getCommand():Command {
    return new SpawnMonsterCommand(this.target);
  }
}
