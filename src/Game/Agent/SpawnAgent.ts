
import Agent from '../Agent';
import {Command} from '../Command';
import {Action} from './Action';
import SpawnMonsterAction from './Action/SpawnMonsterAction';

export default class SpawnAgent extends Agent {

  getPossibleActions():Action[] {
    return [
      new SpawnMonsterAction(this.target)
    ];
  }

}
