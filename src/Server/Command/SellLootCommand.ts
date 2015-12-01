
import {Command} from '../Command';
import GameObject from '../../Common/GameObject';
import Valuable from '../Components/Valuable';
import Inventory from '../Components/Inventory';

export default class SellLootCommand implements Command {

  self:GameObject;
  target:GameObject;

  constructor(self:GameObject, target:GameObject) {
    this.self = self;
    this.target = target;
  }

  execute() {
    this.self.allOfType('item').forEach((item:GameObject) => {
      this.self.remove(item);
      this.target.add(item);
      let basePrice = (<Valuable>item.getComponent('valuable')).getBasePrice();
      (<Inventory>this.self.getComponent('inventory')).giveMoney(basePrice);
    });
  }

  describe() {
    return `Player #${this.self.id} sold his loot to Shopkeep #${this.target.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
