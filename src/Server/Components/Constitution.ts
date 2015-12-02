
import {Component} from '../../Common/Component';
import GameObject from '../../Common/GameObject';
import {Event} from '../../Common/Event';
import Injury from '../Event/Injury';
import Death from '../Event/Death';

export default class Constitution implements Component {

  health:number;
  object:GameObject;

  constructor(gameObject:GameObject) {
    this.object = gameObject
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

  isDead():boolean {
    return this.health <= 0;
  }

  isInjured():boolean {
    return this.health < 50;
  }

  describe():Object {
      return {
        health: this.health
      }
  }

  die() {
    this.object.trigger(new Death());
  }

  onEvent(event:Event) {
    switch(event.getName()) {
      case 'Injury':
        let wasAlive = this.isDead();
        this.health -= (<Injury>event).getDamage();
        if(wasAlive && this.isDead()) {
          this.die();
        }
        break;
    }
  }
}
