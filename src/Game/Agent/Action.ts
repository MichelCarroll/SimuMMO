

import GameObject from '../GameObject';
import {Command} from '../Command';

export interface Action {

  canExecute():boolean;
  retrieveCommand():Command;

}
