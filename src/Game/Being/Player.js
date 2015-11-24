
import Being from '../Being';

export default class Player extends Being {

  constructor() {
    super();
    this.money = 0;
    this.isHurt = false;
  }

  rest() {
    this.isHurt = false;
  }

  injure() {
    this.isHurt = true;
  }

  isInjured() {
    return this.isHurt;
  }

  giveMoney(quantity) {
    this.money += quantity;
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['player']);
  }

}
