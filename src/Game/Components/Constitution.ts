
import {Component} from '../Component';

export default class Constitution implements Component {

  health:number;

  constructor() {
    this.health = 100;
  }

  getName():string {
    return 'constitution';
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
}
