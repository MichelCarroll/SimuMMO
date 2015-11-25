
import {Command} from '../Command';
import Being from '../Being';
import Item from '../Item';

export default class SellLootCommand implements Command {

  self:Being;
  target:Being;

  constructor(self:Being, target:Being) {
    this.self = self;
    this.target = target;
  }

  execute() {
    this.self.allOfType('item').forEach((item:Item) => {
      this.self.remove(item);
      this.target.add(item);
      this.self.getInventory().giveMoney(item.basePrice);
    });
  }

  describe() {
    return `Player #${this.self.id} sold his loot to Shopkeep #${this.target.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
