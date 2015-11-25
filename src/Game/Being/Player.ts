
import Being from '../Being';

export default class Player extends Being {

  health:number;
  money:number;
  isHurt:boolean;

  constructor() {
    super();
    this.money = 0;
    this.health = 100;
  }

  rest(points:number) {
    this.health += points;
  }

  injure(points:number) {
    this.health -= points;
  }

  isInjured():boolean {
    return this.health < 50;
  }

  giveMoney(quantity:number) {
    this.money += quantity;
  }

  getObjectTypes() {
    return super.getObjectTypes().concat(['player']);
  }

}
