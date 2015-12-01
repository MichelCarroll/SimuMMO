
import {Action} from '../Action'
import GameObject from '../../GameObject'
import {Command} from '../../Command';
import KillCommand from '../../Command/KillCommand';

export default class KillMonsterAction implements Action {

  target:GameObject;

  constructor(target:GameObject) {
    this.target = target;
  }

  canExecute():boolean {
    return !!this.target.getParent().oneOfType('monster');
  }

  retrieveCommand():Command {
    return new KillCommand(
      this.target,
      this.target.getParent().oneOfType('monster')
    );
  }

}
