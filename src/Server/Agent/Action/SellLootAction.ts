
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import SellLootCommand from '../../Command/SellLootCommand';
import Valuable from '../../Components/Valuable';

export default class SellLootAction implements Action {

  target:GameObject;
  reward:number;

  constructor(target:GameObject) {
    this.target = target;
    this.reward = this.getFirstValuable() ? (<Valuable>this.getFirstValuable().getComponent('valuable')).getBasePrice() : 0;
  }

  getFirstValuable():GameObject {
    return this.target.oneWithComponent('valuable');
  }

  canExecute():boolean {
    return !!this.target.getParent().oneOfType('shopkeep') && !!this.getFirstValuable();
  }

  retrieveCommand():Command {
    return new SellLootCommand(
      this.target,
      this.target.getParent().oneOfType('shopkeep'),
      this.getFirstValuable()
    );
  }

  getReward():number {
    return this.reward;
  }

  toString():string {
    return 'Sold loot';
  }

}
