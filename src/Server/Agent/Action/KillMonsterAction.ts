
import {Action} from '../Action'
import GameObject from '../../../Common/GameObject';
import {Command} from '../../Command';
import KillCommand from '../../Command/KillCommand';
import Inventory from '../../Components/Inventory';

export default class KillMonsterAction implements Action {

  target:GameObject;
  reward:number;

  constructor(target:GameObject) {
    this.target = target;
    this.reward = (<Inventory>this.target.getComponent('inventory')).getMoney();
  }

  canExecute():boolean {
    return !!this.target.getParent().oneOfType('monster');
  }

  retrieveCommand():Command {
    return new KillCommand(
      this.target,
      this.target.getParent().oneOfType('monster')
    );
  }

  getReward():number {
    return this.reward;
  }

}
