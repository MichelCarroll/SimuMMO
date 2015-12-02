
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import AttackCommand from '../../Command/AttackCommand';
import MoneyPurse from '../../Components/MoneyPurse';

export default class AttackMonsterAction implements Action {

  target:GameObject;

  constructor(target:GameObject) {
    this.target = target;
  }

  findMonster():GameObject {
    return this.target.getParent().oneOfType('monster');
  }

  canExecute():boolean {
    return !!this.findMonster();
  }

  retrieveCommand():Command {
    return new AttackCommand( this.target, this.findMonster() );
  }

  getReward():number {
    return 5;
  }

  toString():string {
    return 'Kill a monster';
  }
}
