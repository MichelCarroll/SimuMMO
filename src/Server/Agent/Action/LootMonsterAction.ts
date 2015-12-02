
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import LootCommand from '../../Command/LootCommand';
import MoneyPurse from '../../Components/MoneyPurse';
import Constitution from '../../Components/Constitution';

export default class LootMonsterAction implements Action {

  target:GameObject;
  reward:number;

  constructor(target:GameObject) {
    this.target = target;
    this.reward = 0;
    let monster = this.findMonster();
    if(monster) {
      this.reward = (<MoneyPurse>this.findMonster().getComponent('moneyPurse')).getMoney();
    }
  }

  findMonster():GameObject {
    return this.target.getParent().oneOfType('monster');
  }

  canExecute():boolean {
    return !!this.findMonster() && (<Constitution>this.findMonster().getComponent('constitution')).isDead();
  }

  retrieveCommand():Command {
    return new LootCommand( this.target, this.findMonster() );
  }

  getReward():number {
    return this.reward;
  }

  toString():string {
    return 'Looted a monster';
  }
}
