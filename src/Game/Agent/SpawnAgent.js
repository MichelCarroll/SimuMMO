
import SpawnMonsterCommand from '../Command/SpawnMonsterCommand';
import Agent from '../Agent';

export default class SpawnAgent extends Agent {

  takeTurn(commandCallback) {
    commandCallback(new SpawnMonsterCommand(this.target));
  }

}
