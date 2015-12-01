

import {Component} from '../../Common/Component';

export default class Valuable implements Component {

  basePrice:number;

  constructor() {
    this.basePrice = 0;
  }

  getName():string {
    return 'valuable';
  }

  setBasePrice(price:number) {
    this.basePrice = price;
  }

  getBasePrice():number {
    return this.basePrice;
  }

  describe():Object {
      return {
        price: this.basePrice
      }
  }

}
