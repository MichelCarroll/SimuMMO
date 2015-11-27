
import {Command} from '../Command';
import GameObject from '../GameObject';
import Inventory from '../Components/Inventory';
import Constitution from '../Components/Constitution';

export default class KillCommand implements Command {

  self:GameObject;
  target:GameObject;

  constructor(self:GameObject, target:GameObject) {
    this.self = self;
    this.target = target;
  }

  execute() {
    (<Constitution>this.target.getComponent('constitution')).injure(10);
    let targetMoney = (<Inventory>this.target.getComponent('inventory')).getMoney();
    (<Inventory>this.self.getComponent('inventory')).giveMoney(targetMoney);
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
    return 0;
  }

}
