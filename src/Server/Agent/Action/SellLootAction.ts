
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import SellLootCommand from '../../Command/SellLootCommand';

export default class SellLootAction implements Action {

  target:GameObject;

  constructor(target:GameObject) {
    this.target = target;
  }

  canExecute():boolean {
    return !!this.target.getParent().oneOfType('shopkeep')
      && this.target.allWithComponent('valuable').length > 0;
  }

  retrieveCommand():Command {
    return new SellLootCommand(
      this.target,
      this.target.getParent().oneOfType('shopkeep')
    );
  }

}
