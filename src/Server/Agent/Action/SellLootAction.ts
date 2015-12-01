
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
    this.reward = target.allOfType('item').reduce((reward:number, item:GameObject) => {
      return reward + (<Valuable>item.getComponent('valuable')).getBasePrice();
    }, 0);
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

  getReward():number {
    return this.reward;
  }

}
