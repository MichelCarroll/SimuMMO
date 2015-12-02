
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import AttackCommand from '../../Command/AttackCommand';
import MoneyPurse from '../../Components/MoneyPurse';
import Constitution from '../../Components/Constitution';

export default class AttackMonsterAction implements Action {

  target:GameObject;
  reward:number;

  constructor(target:GameObject) {
    this.target = target;
    let monster = this.findMonster();
    this.reward = monster && !(<Constitution>monster.getComponent('constitution')).isDead() ? 1 : 0;
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
    return this.reward;
  }

  toString():string {
    return 'Attack a monster';
  }
}
