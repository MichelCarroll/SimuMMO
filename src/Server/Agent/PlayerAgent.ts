

declare function require(str:string):any;

import {Command} from '../Command';
import {Action} from './Action';
import GameObject from '../../Common/GameObject';
import SmartAgent from './SmartAgent';

import GotoTownAction from './Action/GotoTownAction';
import GotoDungeonAction from './Action/GotoDungeonAction';
import RestAction from './Action/RestAction';
import KillMonsterAction from './Action/KillMonsterAction';
import SellLootAction from './Action/SellLootAction';

import Valuable from '../Components/Valuable';
import Constitution from '../Components/Constitution';
import Referencer from '../Components/Referencer';
import Inventory from '../Components/Inventory';

export default class PlayerAgent extends SmartAgent {

  getPossibleActions():Action[] {
    return [
      new GotoTownAction(this.target),
      new GotoDungeonAction(this.target),
      new RestAction(this.target),
      new KillMonsterAction(this.target),
      new SellLootAction(this.target),
    ];
  }

  getTotalValuables():number {
    return this.target.allWithComponent('valuable').reduce((amount:number, valuable:GameObject) => {
      return amount + (<Valuable>valuable.getComponent('valuable')).getBasePrice();
    }, 0);
  }

  getTotalMoney():number {
    return (<Inventory>this.target.getComponent('inventory')).getMoney();
  }

  getState():number[] {
    return [
      this.target.getParent().isA('town') ? 1 : 0,
      // this.getTotalMoney(),
      this.getTotalValuables()
    ]
  }

  getCurrentScore():number {
    return this.getTotalMoney();
  }
}