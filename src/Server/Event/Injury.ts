
import {Event} from '../../Common/Event';

export default class Injury implements Event {

  private amount:number;

  constructor(amount:number) {
    this.amount = amount;
  }

  getDamage():number {
    return this.amount;
  }

  getName():string {
    return 'Injury';
  }
}
