

declare function require(str:string):any;

import {Command} from '../Command';
import {Action} from './Action';
import Agent from '../Agent';

import GotoTownAction from './Action/GotoTownAction';
import GotoDungeonAction from './Action/GotoDungeonAction';
import RestAction from './Action/RestAction';
import KillMonsterAction from './Action/KillMonsterAction';
import SellLootAction from './Action/SellLootAction';

export default class PlayerAgent extends Agent {

  getPossibleActions():Action[] {
    return [
      new GotoTownAction(this.target),
      new GotoDungeonAction(this.target),
      new RestAction(this.target),
      new KillMonsterAction(this.target),
      new SellLootAction(this.target),
    ];
  }
}
