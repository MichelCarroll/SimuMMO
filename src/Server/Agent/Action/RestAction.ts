
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import RestCommand from '../../Command/RestCommand';
import {Command} from '../../Command';

export default class GotoAction implements Action {

  target:GameObject;

  constructor(target:GameObject) {
    this.target = target;
  }

  canExecute():boolean {
    return this.target.getParent().isA('town');
  }

  retrieveCommand():Command {
    return new RestCommand(this.target);
  }

  getReward():number {
    return -0.1;
  }

  toString():string {
    return 'Rest';
  }

}
