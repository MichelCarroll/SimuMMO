

import GameObject from '../../Common/GameObject';
import {Command} from '../Command';

export interface Action {

  canExecute():boolean;
  retrieveCommand():Command;
  getReward():number;

}
