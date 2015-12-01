
import {Component} from '../../Common/Component';

export default class Inventory implements Component {

  money:number;

  constructor() {
    this.money = 0;
  }

  getName():string {
    return 'inventory';
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
