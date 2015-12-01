
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import KillCommand from '../../Command/KillCommand';
import Inventory from '../../Components/Inventory';

export default class KillMonsterAction implements Action {

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
    return new KillCommand( this.target, this.findMonster() );
  }

  getReward():number {
    return 10;
  }

  toString():string {
    return 'Kill a monster';
  }
}
