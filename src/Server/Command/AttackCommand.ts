
import {Command} from '../Command';
import GameObject from '../../Common/GameObject';
import MoneyPurse from '../Components/MoneyPurse';
import Constitution from '../Components/Constitution';
import Injury from '../Event/Injury';

export default class AttackCommand implements Command {

  self:GameObject;
  target:GameObject;

  constructor(self:GameObject, target:GameObject) {
    this.self = self;
    this.target = target;
  }

  execute() {
    this.target.trigger(new Injury(100));
  }

  describe() {
    return `Player #${this.self.id} attacked Monster #${this.target.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
