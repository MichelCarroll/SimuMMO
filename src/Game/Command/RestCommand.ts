
import GameObject from '../GameObject';
import {Command} from '../Command';
import Constitution from '../Components/Constitution';

export default class RestCommand implements Command {

  self:GameObject;

  constructor(self:GameObject) {
    this.self = self;
  }

  execute() {
    (<Constitution>this.self.getComponent('constitution')).rest(10);
  }

  describe() {
    return `Player #${this.self.id} rested`;
  }

  getTurnCooldown():number {
    return 0;
  }

  getReward():number {
    return -0.5;
  }

}
