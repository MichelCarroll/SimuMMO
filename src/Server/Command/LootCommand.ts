
import {Command} from '../Command';
import GameObject from '../../Common/GameObject';
import MoneyPurse from '../Components/MoneyPurse';
import Constitution from '../Components/Constitution';
import Injury from '../Event/Injury';
import GiveMoney from '../Event/GiveMoney';

export default class LootCommand implements Command {

  self:GameObject;
  target:GameObject;

  constructor(self:GameObject, target:GameObject) {
    this.self = self;
    this.target = target;
  }

  execute() {
    let rewardMoney = (<MoneyPurse>this.target.getComponent('moneyPurse')).getMoney();
    this.self.trigger(new GiveMoney(rewardMoney));
    this.self.takeAll(this.target);
    this.target.getParent().remove(this.target);
  }

  describe() {
    return `Player #${this.self.id} looted Monster #${this.target.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
