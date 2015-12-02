
import {Component} from '../../Common/Component';

export default class MoneyPurse implements Component {

  money:number;

  constructor() {
    this.money = 0;
  }

  getName():string {
    return 'moneyPurse';
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

  transferTo(moneyPurse:MoneyPurse) {
    this.giveMoney(moneyPurse.getMoney());
    moneyPurse.takeMoney(moneyPurse.getMoney());
  }

  describe():Object {
      return {
        money: this.money
      }
  }
}
