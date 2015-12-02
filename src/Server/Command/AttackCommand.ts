
import {Command} from '../Command';
import GameObject from '../../Common/GameObject';
import MoneyPurse from '../Components/MoneyPurse';
import Constitution from '../Components/Constitution';

export default class AttackCommand implements Command {

  self:GameObject;
  target:GameObject;
  reward:number;

  constructor(self:GameObject, target:GameObject) {
    this.self = self;
    this.target = target;
    this.reward = 0;
  }

  execute() {
    (<Constitution>this.target.getComponent('constitution')).injure(10);
    (<MoneyPurse>this.self.getComponent('moneyPurse')).giveMoney(
      (<MoneyPurse>this.target.getComponent('moneyPurse')).getMoney()
    );
    this.self.takeAll(this.target);
    this.target.getParent().remove(this.target);
  }

  describe() {
    return `Player #${this.self.id} killed Monster #${this.target.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

  getReward():number {
    return this.reward;
  }

}
