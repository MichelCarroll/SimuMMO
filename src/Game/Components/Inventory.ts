
import Item from '../Item';

export default class Inventory {

  money:number;

  constructor() {
    this.money = 0;
  }

  giveMoney(quantity:number) {
    this.money += quantity;
  }

  takeMoney(quantity:number) {
    this.money -= quantity;
  }

  getMoney():number {
    return this.money;
  }

  transferTo(inventory:Inventory) {
    this.giveMoney(inventory.getMoney());
    inventory.takeMoney(inventory.getMoney());
  }
}
