


import GameObject from './GameObject';

export default class Item extends GameObject {

  basePrice:number;

  constructor(basePrice:number) {
    super(['item']);
    this.basePrice = basePrice;
  }

  getBasePrice():number {
    return this.basePrice;
  }

}
