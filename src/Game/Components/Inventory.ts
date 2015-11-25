
import Item from '../Item';

export default class Inventory {

  money:number;
  objects:Item[];

  constructor() {
    this.money = 0;
    this.objects = [];
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
}
