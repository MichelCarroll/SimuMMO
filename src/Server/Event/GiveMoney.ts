
import {Event} from '../../Common/Event';

export default class GiveMoney implements Event {

  private amount:number;

  constructor(amount:number) {
    this.amount = amount;
  }

  getAmount():number {
    return this.amount;
  }

  getName():string {
    return 'GiveMoney';
  }
}
