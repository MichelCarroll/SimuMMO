
import {Component} from '../../Common/Component';
import {Event} from '../../Common/Event';
import GiveMoney from '../Event/GiveMoney';

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

  onEvent(event:Event) {
    switch(event.getName()) {
      case 'GiveMoney':
        this.money += (<GiveMoney>event).getAmount();
        break;
    }
  }
}
