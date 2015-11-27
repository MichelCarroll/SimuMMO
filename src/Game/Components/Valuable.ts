

import {Component} from '../Component';

export default class Valuable implements Component {

  basePrice:number;

  constructor(basePrice:number) {
    this.basePrice = basePrice;
  }

  getName():string {
    return 'valuable';
  }

  getBasePrice():number {
    return this.basePrice;
  }

}
