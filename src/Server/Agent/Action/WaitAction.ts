
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import WaitCommand from '../../Command/WaitCommand';

export default class WaitAction implements Action {

  target:GameObject;

  constructor(target:GameObject) {
    this.target = target;
  }

  canExecute():boolean {
    return true;
  }

  retrieveCommand():Command {
    return new WaitCommand();
  }

  getReward():number {
    return -0.1;
  }

}
