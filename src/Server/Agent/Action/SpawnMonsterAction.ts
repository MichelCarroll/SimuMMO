
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import SpawnMonsterCommand from '../../Command/SpawnMonsterCommand';

export default class SpawnMonsterAction implements Action {

  target:GameObject;

  constructor(target:GameObject) {
    this.target = target;
  }

  canExecute():boolean {
    return true;
  }

  retrieveCommand():Command {
    return new SpawnMonsterCommand(this.target);
  }

  getReward():number {
    return 0;
  }

}
