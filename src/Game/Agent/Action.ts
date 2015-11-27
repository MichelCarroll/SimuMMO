

import GameObject from '../GameObject';
import {Command} from '../Command';

export interface Action {

  canExecute(target:GameObject):boolean;
  retrieveCommand(target:GameObject):Command;

}
