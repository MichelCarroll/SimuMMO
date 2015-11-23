
import Being from '../Being';

export default class Player extends Being {

  constructor() {
    super();
    this.money = 0;
  }

  giveMoney(quantity) {
    this.money += quantity;
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['player']);
  }

}
